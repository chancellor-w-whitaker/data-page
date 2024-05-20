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
    },
    serviceRegionCounty: {
      fillColor: colors.serviceRegionCounty,
      color: colors.border,
      fillOpacity: 1,
    },
    highlightedLayer: { color: "#ffe484", fillOpacity: 0.7 },
  },
  legendRows: [
    { color: colors.serviceRegionCounty, label: "Service region" },
    { color: colors.nonServiceRegionCounty, label: "Non-service region" },
  ],
  tooltipOptions: {
    className: "pe-auto leaflet-tooltip-hover",
    direction: "center",
    permanent: true,
  },
  mapOptions: {
    center: coordinates.elizabethtown,
    dragging: false,
    zoom: 8,
  },
};

const { tooltipOptions, mapOptions, legendRows, styles } = constants;

const style = (feature) => {
  return hasServiceRegionCounty(feature)
    ? styles.serviceRegionCounty
    : styles.nonServiceRegionCounty;
};

const getCountyIdentifier = (feature) => {
  return feature.properties[countyProperty]
    .split(" ")
    .filter((word) => word.toLowerCase() !== "county")
    .join(" ");
};

export class MapWidget {
  constructor(domNode, geojsonFeature) {
    this.map = L.map(domNode, mapOptions);

    const map = this.map;

    L.marker(coordinates.easternKentuckyUniversity)
      .addTo(map)
      .bindPopup("Eastern Kentucky University")
      .openPopup();

    function highlightFeature(e) {
      const layer = e.target;

      layer.setStyle(styles.highlightedLayer);

      layer.bringToFront();
    }

    const geojsonOptions = { onEachFeature, style };

    const geojson = L.geoJson(geojsonFeature, geojsonOptions).addTo(map);

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
    }

    function zoomMapToFit() {
      const bounds = geojson.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    }

    zoomMapToFit();

    const mapHandlers = { resize: zoomMapToFit };

    map.on(mapHandlers);

    function onEachFeature(feature, layer) {
      const layerHandlers = {
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      };

      layer.on(layerHandlers);

      layer.bindTooltip(getCountyIdentifier(feature), tooltipOptions);
    }

    // legend

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < legendRows.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          legendRows[i].color +
          '"></i> ' +
          legendRows[i].label +
          "<br>";
      }

      return div;
    };

    legend.addTo(map);
  }
}
