import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { hasServiceRegionCounty, countyProperty } from "./exports";
import { findSum } from "../../js/findSum";

const colors = {
  nonServiceRegion: "#009681",
  serviceRegion: "#861F41",
  hovered: "yellow",
  info: "black",
};

const generateInfoRowHtml = (title, number, color = colors.info) =>
  `<div class="d-flex gap-2">
    <h4 class="me-auto" style="color: ${color};">${title}:</h4>
    <h4 style="color: ${color};">${number.toLocaleString()}</h4>
  </div>`;

const findSums = (geojson) => {
  const serviceRegionSum = findSum(
    geojson.features
      .filter(hasServiceRegionCounty)
      .map((feature) => feature.properties.enrollment)
  );

  const nonServiceRegionSum = findSum(
    geojson.features
      .filter((feature) => !hasServiceRegionCounty(feature))
      .map((feature) => feature.properties.enrollment)
  );

  const combinedSum = serviceRegionSum + nonServiceRegionSum;

  const serviceRegionRow = generateInfoRowHtml(
    "Service region",
    serviceRegionSum,
    colors.serviceRegion
  );

  const nonServiceRegionRow = generateInfoRowHtml(
    "Non-service region",
    nonServiceRegionSum,
    colors.nonServiceRegion
  );

  const currentEnrollmentRow = generateInfoRowHtml(
    "Fall 2024 enrollment",
    combinedSum
  );

  const rows = [currentEnrollmentRow, nonServiceRegionRow, serviceRegionRow];

  return rows;
};

const legendPosition = "bottomright";

const highlightedStyle = { color: colors.hovered, weight: 3 };

// const linkClasses = "link-underline-primary";

const classNames = {
  nonHovered: `leaflet-tooltip-inactive`,
  hovered: `leaflet-tooltip-active`,
};

const coordinates = {
  easternKentuckyUniversity: [37.736, -84.2987],
  elizabethtown: [37.7031, -85.8649],
};

const popups = {
  easternKentuckyUniversity: {
    coordinates: coordinates.easternKentuckyUniversity,
    content: "Eastern Kentucky University",
  },
};

const tooltipOptions = {
  className: classNames.nonHovered,
  direction: "center",
  permanent: true,
};

const mapOptions = { center: coordinates.elizabethtown };

const generateCountyUrl = (county) =>
  `https://irserver2.eku.edu/reports/sas/counties/data/${county}%20Kentucky.html`;

const generateLegendRowHtml = (array, index) =>
  '<i style="background:' +
  getColor(array[index] + 1) +
  '"></i> ' +
  array[index] +
  (array[index + 1] ? "&ndash;" + array[index + 1] + "<br>" : "+");

const generateInfo = (props, rows) => {
  const topRows = rows.join("");

  const [title, number, textColor] = [
    props
      ? props[countyProperty]
          .split(" ")
          .map((word, index) => (index === 0 ? word : word.toLowerCase()))
          .join(" ")
      : "Hover over a county",
    props ? props.enrollment.toLocaleString() : "?",
    !props
      ? colors.info
      : hasServiceRegionCounty({ properties: props })
      ? colors.serviceRegion
      : colors.nonServiceRegion,
  ];

  const bottomRow = generateInfoRowHtml(title, number, textColor);

  return `<div>${topRows}${bottomRow}</div>`;
};

const getCountyIdentifier = (feature) =>
  feature.properties[countyProperty]
    .split(" ")
    .filter((word) => word.toLowerCase() !== "county")
    .join(" ");

const maroonColors = [
  "#861f41",
  "#923554",
  "#9e4c67",
  "#aa627a",
  "#b6798d",
  "#c38fa0",
  "#cfa5b3",
  "#dbbcc6",
];

const getColor2 = (d) =>
  d > 1000
    ? maroonColors[0]
    : d > 500
    ? maroonColors[1]
    : d > 200
    ? maroonColors[2]
    : d > 100
    ? maroonColors[3]
    : d > 50
    ? maroonColors[4]
    : d > 20
    ? maroonColors[5]
    : d > 10
    ? maroonColors[6]
    : maroonColors[7];

function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

const openInNewTab = (url) => window.open(url, "_blank").focus();

const getFeatureStyle = (feature) => ({
  color: hasServiceRegionCounty(feature)
    ? colors.serviceRegion
    : colors.nonServiceRegion,
  fillOpacity: hasServiceRegionCounty(feature) ? 1 : 0.75,
  fillColor: getColor(feature.properties.enrollment),
  weight: hasServiceRegionCounty(feature) ? 3 : 1,
  opacity: 1,
});

export class MapWidget {
  constructor(domNode, geojsonFeature) {
    this.map = L.map(domNode, mapOptions);

    const sumRows = findSums(geojsonFeature);

    const map = this.map;

    L.marker(popups.easternKentuckyUniversity.coordinates)
      .addTo(map)
      .bindPopup(popups.easternKentuckyUniversity.content)
      .openPopup();

    function style(feature) {
      return getFeatureStyle(feature);
    }

    const geojsonOptions = { onEachFeature, style };

    const geojson = L.geoJson(geojsonFeature, geojsonOptions).addTo(map);

    function zoomMapToFit() {
      const bounds = geojson.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }

    zoomMapToFit();

    const mapListeners = { resize: zoomMapToFit };

    map.on(mapListeners);

    // ! info

    const info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = generateInfo(props, sumRows);
    };

    info.addTo(map);

    function highlightFeature(e) {
      const [layer, feature] = [e.target, e.target.feature];

      layer.setStyle(highlightedStyle);

      layer.bringToFront();

      layer.unbindTooltip();

      layer.bindTooltip(`${getCountyIdentifier(feature)}`, {
        ...tooltipOptions,
        className: classNames.hovered,
      });

      info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      const [layer, feature] = [e.target, e.target.feature];

      geojson.resetStyle(layer);

      layer.unbindTooltip();

      layer.bindTooltip(getCountyIdentifier(feature), {
        ...tooltipOptions,
        className: classNames.nonHovered,
      });

      if (!hasServiceRegionCounty(feature)) {
        layer.bringToBack();
      }

      info.update();
    }

    function onEachFeature(feature, layer) {
      const name = getCountyIdentifier(feature);

      const layerListeners = {
        click: () => openInNewTab(generateCountyUrl(name)),
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      };

      layer.on(layerListeners);

      layer.bindTooltip(name, tooltipOptions);
    }

    // ! legend

    var legend = L.control({ position: legendPosition });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        levels = [0, 10, 20, 50, 100, 200, 500, 1000];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var index = 0; index < levels.length; index++) {
        div.innerHTML += generateLegendRowHtml(levels, index);
      }

      return div;
    };

    legend.addTo(map);
  }
}
