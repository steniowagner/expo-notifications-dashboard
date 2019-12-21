import { ChangeEvent, useCallback, useState, useEffect } from 'react';

import { sortDescendent, sortDataset } from '../../../../utils/array';
import { filterByText } from '../../../../utils/filters';
import { TableOrder } from '../../../../types';

const DESCENDENT_ORDER = 'desc';
const ASCENDENT_ORDER = 'asc';

const useTable = (initiallyOrderedBy: string, dataset: any[], filters: string[]) => {
  const [orderBy, setOrderBy] = useState<string>(initiallyOrderedBy);
  const [order, setOrder] = useState<TableOrder>(ASCENDENT_ORDER);
  const [datasetCopy, setDasetCopy] = useState<any[]>(dataset);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setPage] = useState<number>(0);

  useEffect(() => {
    setDasetCopy(dataset);
  }, [dataset]);

  const onRequestSort = (field: string) => {
    const isOrderDescendent = orderBy === field && order === DESCENDENT_ORDER;

    setOrder(isOrderDescendent ? ASCENDENT_ORDER : DESCENDENT_ORDER);

    setOrderBy(field);
  };

  const getSorting = () =>
    order === DESCENDENT_ORDER
      ? (a: any, b: any) => sortDescendent(a, b, orderBy)
      : (a: any, b: any) => -sortDescendent(a, b, orderBy);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onFilter = useCallback(
    value => {
      const datasetFiltered = filterByText(dataset, filters, value);
      setDasetCopy(datasetFiltered);
      setPage(0);
    },
    [dataset, filters],
  );

  const items = sortDataset(datasetCopy, getSorting()).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const numberEmptyRows =
    rowsPerPage - Math.min(rowsPerPage, datasetCopy.length - currentPage * rowsPerPage);

  return {
    handleChangeRowsPerPage,
    numberEmptyRows,
    onRequestSort,
    datasetCopy,
    currentPage,
    rowsPerPage,
    onFilter,
    setPage,
    orderBy,
    order,
    items,
  };
};

export default useTable;
