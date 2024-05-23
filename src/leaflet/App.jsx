import { useMemo } from "react";

import { hasServiceRegionCounty } from "./utils/exports";
import { pivotData } from "../js/pivotData";
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

const findSum = (array) => array.reduce((partialSum, a) => partialSum + a, 0);

export default function App() {
  const geojsonFeature = useData(geojsonUrl);

  const enrollmentData = useData("data/enrollment.json");

  const countyEnrollment = useMemo(() => {
    const [pivotField, measures, groupBy, data] = [
      "county",
      ["Current"],
      [],
      enrollmentData,
    ];

    const { topRowData } = pivotData({
      pivotField,
      measures,
      groupBy,
      data,
    });

    return topRowData[0];
  }, [enrollmentData]);

  const geojsonData = useMemo(
    () => validateData(geojsonFeature),
    [geojsonFeature]
  );

  const geojsonDataWithEnrollment = useMemo(() => {
    const { features } = geojsonData;

    const keys = Object.keys(countyEnrollment);

    const shouldProceed = features.length > 0 && keys.length > 0;

    if (shouldProceed) {
      features.forEach((feature) => {
        const {
          properties: { NAMELSAD: countyName },
        } = feature;

        const countyID = countyName
          .split(" ")
          .filter((word) => word.toLowerCase() !== "county")
          .join(" ");

        const match = countyEnrollment[countyID];

        const mapObject = feature.properties;

        const enrollment = typeof match === "object" ? match.Current : 0;

        mapObject.enrollment = enrollment;
      });
    }

    return geojsonData;
  }, [countyEnrollment, geojsonData]);

  return <Map geojsonFeature={geojsonDataWithEnrollment} key={Math.random()} />;
}
