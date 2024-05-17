import { useEffect, useRef } from "react";

import { MapWidget } from "./utils/map-widget";

export default function Map({ geojsonFeature }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current, geojsonFeature);
    }
  }, [geojsonFeature]);

  return <div style={{ height: "100vh" }} ref={containerRef} />;
}

// export default function Map({ zoomLevel }) {
//   const containerRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current === null) {
//       mapRef.current = new MapWidget(containerRef.current);
//     }

//     const map = mapRef.current;
//     map.setZoom(zoomLevel);
//   }, [zoomLevel]);

//   return <div style={{ width: 200, height: 200 }} ref={containerRef} />;
// }
