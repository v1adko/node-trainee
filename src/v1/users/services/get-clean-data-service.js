const getCleanData = (filterData) => {
  const cleanFilterData = {};
  Object.keys(filterData)
    .filter(key => filterData[key])
    .forEach((key) => {
      cleanFilterData[key] = filterData[key];
    });
  return cleanFilterData;
};

export default getCleanData;
