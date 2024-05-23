import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { hasServiceRegionCounty, countyProperty } from "./exports";

const coordinates = {
  easternKentuckyUniversity: [37.736, -84.2987],
  elizabethtown: [37.7031, -85.8649],
};

const colors = {
  nonServiceRegionCounty: "#eeeeee",
  serviceRegionCounty: "#dd6d9e",
  border: "#7c7c7c",
};

const constants = {
  styles: {
    nonServiceRegionCounty: {
      fillColor: colors.nonServiceRegionCounty,
      color: colors.border,
      fillOpacity: 1,
      weight: 1,
    },
    serviceRegionCounty: {
      fillColor: colors.serviceRegionCounty,
      color: colors.border,
      fillOpacity: 1,
      weight: 1,
    },
  },
  popups: {
    easternKentuckyUniversity: {
      coordinates: coordinates.easternKentuckyUniversity,
      content: "Eastern Kentucky University",
    },
  },
  legendRows: [
    { label: "Service region", color: "pink" },
    { label: "Non-service region", color: "blue" },
  ],
  tooltipOptions: {
    className: "leaflet-tooltip-inactive",
    direction: "center",
    permanent: true,
  },
  mapOptions: {
    center: coordinates.elizabethtown,
  },
};

const { tooltipOptions, mapOptions, legendRows, styles, popups } = constants;

const style = (feature) => {
  if (hasServiceRegionCounty(feature)) {
    return { color: "pink" };
  } else {
    return { color: "blue" };
  }
  // return hasServiceRegionCounty(feature)
  //   ? styles.serviceRegionCounty
  //   : styles.nonServiceRegionCounty;
};

const getCountyIdentifier = (feature) => {
  return feature.properties[countyProperty]
    .split(" ")
    .filter((word) => word.toLowerCase() !== "county")
    .join(" ");
};

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

export class MapWidget {
  constructor(domNode, geojsonFeature) {
    this.map = L.map(domNode, mapOptions);

    const map = this.map;

    L.marker(popups.easternKentuckyUniversity.coordinates)
      .addTo(map)
      .bindPopup(popups.easternKentuckyUniversity.content)
      .openPopup();

    function style(feature) {
      return {
        color: hasServiceRegionCounty(feature) ? "black" : "white",
        fillOpacity: hasServiceRegionCounty(feature) ? "1" : "0.7",
        // dashArray: hasServiceRegionCounty(feature) ? "1" : "4",
        fillColor: getColor(feature.properties.enrollment),
        weight: hasServiceRegionCounty(feature) ? 3 : 1,
        opacity: 1,
      };
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
      this._div.innerHTML = `<div class="text-end"><h4>Enrollment</h4><h4>${
        props ? props[countyProperty] : "Hover Over a County"
      }</h4><h4>${props ? props.enrollment.toLocaleString() : "?"}</h4></div>`;
    };

    // method that we will use to update the control based on feature properties passed
    // info.update = function (props = {}) {
    //   const {
    //     [countyProperty]: county,
    //     INTPTLAT: lat = "",
    //     INTPTLON: lon = "",
    //   } = props;

    //   const latitude = `${lat.substring(1)}° ${lat[0] === "+" ? "N" : "S"}`;

    //   const longitude = `${lon.substring(1)}° ${lon[0] === "+" ? "E" : "W"}`;

    //   this._div.innerHTML = county
    //     ? `<b>${county}</b><br />${latitude}, ${longitude}`
    //     : "Hover over a county";
    // };

    info.addTo(map);

    function highlightFeature(e) {
      const [layer, feature] = [e.target, e.target.feature];

      layer.setStyle({
        color: "blue",
        weight: 3,
      });

      layer.bringToFront();

      layer.unbindTooltip();

      layer.bindTooltip(`${getCountyIdentifier(feature)}`, {
        ...tooltipOptions,
        className: "leaflet-tooltip-active",
      });

      info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      const [layer, feature] = [e.target, e.target.feature];

      geojson.resetStyle(layer);

      layer.unbindTooltip();

      layer.bindTooltip(getCountyIdentifier(feature), {
        ...tooltipOptions,
        className: "leaflet-tooltip-inactive",
      });

      if (!hasServiceRegionCounty(feature)) {
        layer.bringToBack();
      }

      info.update();
    }

    function openInNewTab(url) {
      window.open(url, "_blank").focus();
    }

    function onEachFeature(feature, layer) {
      const name = getCountyIdentifier(feature);

      const layerListeners = {
        click: () =>
          openInNewTab(
            `https://irserver2.eku.edu/reports/sas/counties/data/${name}%20Kentucky.html`
          ),
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      };

      layer.on(layerListeners);

      layer.bindTooltip(name, tooltipOptions);
    }

    // ! legend

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legend.addTo(map);
  }
}
