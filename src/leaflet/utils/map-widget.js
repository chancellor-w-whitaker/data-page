import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import { geojsonOptions, mapOptions } from "./constants";

export class MapWidget {
  constructor(domNode, geojsonFeature) {
    this.map = L.map(domNode, mapOptions);

    // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attribution: "© OpenStreetMap",
    //   maxZoom: 19,
    // }).addTo(this.map);

    L.marker([37.736, -84.2987])
      .addTo(this.map)
      .bindPopup("Eastern Kentucky University")
      .openPopup();

    L.geoJSON(geojsonFeature, geojsonOptions).addTo(this.map);
  }
}

// export class MapWidget {
//   constructor(domNode) {
//     this.map = L.map(domNode, {
//       zoomControl: false,
//       doubleClickZoom: false,
//       boxZoom: false,
//       keyboard: false,
//       scrollWheelZoom: false,
//       zoomAnimation: false,
//       touchZoom: false,
//       zoomSnap: 0.1,
//     });
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution: "© OpenStreetMap",
//     }).addTo(this.map);
//     this.map.setView([0, 0], 0);
//   }
//   setZoom(level) {
//     this.map.setZoom(level);
//   }
// }
