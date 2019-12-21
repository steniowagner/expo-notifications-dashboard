const textFilter = (dataset: any[], filters: string[], value: string) => {
  if (!value) {
    return dataset;
  }

  const stringToTest = value.replace(/\\/g, '\\\\');
  const regexSubstring = new RegExp(stringToTest, 'i');

  const datasetFiltered = dataset.filter(item =>
    filters.some(filter => regexSubstring.test(item[filter])),
  );

  return datasetFiltered;
};

export default textFilter;
