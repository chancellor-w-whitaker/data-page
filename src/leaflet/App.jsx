import { useMemo } from "react";

import { hasServiceRegionCounty } from "./utils/exports";
import { useData } from "./utils/useData";
import Map from "./Map";

const geojsonUrl =
  "https://services1.arcgis.com/GWbDzXVIBphv2Dgx/arcgis/rest/services/KY_Income_gdb/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

const booleanToNumber = (condition) => (condition ? 1 : 0);

const sorter = (featureA, featureB) =>
  booleanToNumber(hasServiceRegionCounty(featureA)) -
  booleanToNumber(hasServiceRegionCounty(featureB));

const featuresValidator = (data) =>
  data && typeof data === "object" && "features" in data
    ? [...data.features].sort(sorter)
    : [];

const typeValidator = (data) =>
  data && typeof data === "object" && "type" in data ? data.type : "";

const validateData = (data) => ({
  features: featuresValidator(data),
  type: typeValidator(data),
});

export default function App() {
  const geojsonFeature = useData(geojsonUrl);

  const data = useMemo(() => validateData(geojsonFeature), [geojsonFeature]);

  return <Map geojsonFeature={data} key={Math.random()} />;
}
