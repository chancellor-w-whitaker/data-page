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

export const countyProperty = "NAMELSAD";

export const serviceRegionCountiesSet = new Set(serviceRegionCounties);

export const hasServiceRegionCounty = (feature) =>
  serviceRegionCountiesSet.has(feature.properties[countyProperty]);
