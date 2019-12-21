const sortDataset = (array: any[], compare: (itemA: any, itemB: any) => number) => {
  const dataset = array.map((item, index) => [item, index]);

  dataset.sort((a, b) => {
    const order = compare(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return dataset.map(item => item[0]);
};

export default sortDataset;
