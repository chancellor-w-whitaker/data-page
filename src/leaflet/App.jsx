import { useMemo } from "react";

import { geojsonUrl } from "./utils/constants";
import { useData } from "./utils/useData";
import Map from "./Map";

const serviceRegionCounties = [
  "Bell County",
  "Boyle County",
  "Casey County",
  "Clay County",
  "Estill County",
  "Garrard County",
  "Harlan County",
  "Jackson County",
  "Knox County",
  "Laurel County",
  "Lee County",
  "Leslie County",
  "Lincoln County",
  "Madison County",
  "McCreary County",
  "Owsley County",
  "Perry County",
  "Powell County",
  "Pulaski County",
  "Rockcastle County",
  "Wayne County",
  "Whitley County",
];

const set = new Set(serviceRegionCounties);

const isServiceRegCounty = (feature) =>
  set.has(feature.properties.NAMELSAD) ? 1 : 0;

const sortFunction = (featA, featB) =>
  isServiceRegCounty(featA) - isServiceRegCounty(featB);

export default function App() {
  const geojsonFeature = useData(geojsonUrl);

  const data = useMemo(
    () => ({
      features:
        geojsonFeature &&
        typeof geojsonFeature === "object" &&
        "features" in geojsonFeature
          ? [...geojsonFeature.features].sort(sortFunction)
          : [],
      type:
        geojsonFeature &&
        typeof geojsonFeature === "object" &&
        "type" in geojsonFeature
          ? geojsonFeature.type
          : "",
    }),
    [geojsonFeature]
  );

  console.log(geojsonFeature);

  return <Map geojsonFeature={data} key={Math.random()} />;
}

// export default function App() {
//   const [zoomLevel, setZoomLevel] = useState(0);
//   return (
//     <>
//       Zoom level: {zoomLevel}x
//       <button onClick={() => setZoomLevel(zoomLevel + 1)}>+</button>
//       <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
//       <hr />
//       <Map zoomLevel={zoomLevel} />
//     </>
//   );
// }
