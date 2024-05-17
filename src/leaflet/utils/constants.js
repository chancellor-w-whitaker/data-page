const constants = {
  serviceRegionCounties: [
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
  ],
  tooltipOptions: {
    className:
      // "p-1 pe-auto border-0 opacity-75 z-1-on-hover opacity-100-on-hover bg-warning-border-subtle-on-hover",
      "pe-auto leaflet-tooltip-hover",
    direction: "center",
    permanent: true,
  },
  elizabethtownCoordinates: [37.7031, -85.8649],
  countyProperty: "NAMELSAD",
  highlightColor: "#dd6d9e",
  dragging: false,
  zoom: 8,
};

const {
  elizabethtownCoordinates,
  serviceRegionCounties,
  countyProperty,
  highlightColor,
  tooltipOptions,
  dragging,
  zoom,
} = constants;

const countiesSet = new Set(serviceRegionCounties);

const center = elizabethtownCoordinates;

const hasServiceRegionCounty = (feature) =>
  countiesSet.has(feature.properties[countyProperty]);

const style = (feature) => {
  if (hasServiceRegionCounty(feature)) {
    return { color: highlightColor };
  }
};

const onEachFeature = (feature, layer) => {
  // if (hasServiceRegionCounty(feature)) {
  layer.bindTooltip(
    feature.properties[countyProperty]
      .split(" ")
      .filter((word) => word.toLowerCase() !== "county")
      .join(" "),
    tooltipOptions
  );
  // }
};

export const mapOptions = { zoomControl: false, dragging, center, zoom };

export const geojsonOptions = { onEachFeature, style };

export const geojsonUrl =
  "https://services1.arcgis.com/GWbDzXVIBphv2Dgx/arcgis/rest/services/KY_Income_gdb/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
