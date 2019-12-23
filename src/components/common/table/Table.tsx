import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  TablePagination,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Table,
} from '@material-ui/core';

import HeaderToolbar from './HeaderToolbar';
import EnhancedTableRow from './TableRow';
import useTable from './hooks/useTable';
import TableHead from './TableHead';
import Filter from './Filter';

import { TableConfig } from '../../../types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  loadingWrapper: {
    display: 'flex',
    width: '100%',
    height: 53 * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const shouldComponentUpdate = (previousProps: Props, nextProps: Props) => {
  if (
    previousProps.itemsSelectedCount !== nextProps.itemsSelectedCount ||
    previousProps.dataset.length !== nextProps.dataset.length ||
    previousProps.loading !== nextProps.loading
  ) {
    return false;
  }

  return true;
};

interface Props {
  checkIsItemSelected: (token: string) => boolean;
  onSelectItem: (item: any) => void;
  onRemoveSelectedItems: () => void;
  onSelectAllItems: () => void;
  itemsSelectedCount: number;
  withCheckboxes: boolean;
  withHeader: boolean;
  withFilter: boolean;
  config: TableConfig;
  loading: boolean;
  dataset: any[];
}

const EnhancedTable = ({
  onRemoveSelectedItems,
  checkIsItemSelected,
  itemsSelectedCount,
  onSelectAllItems,
  withCheckboxes,
  onSelectItem,
  withHeader,
  withFilter,
  loading,
  dataset,
  config,
}: Props) => {
  const { initiallyOrderedBy, selectedVerifier, headerCells, filters, fields } = config;

  const {
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
  } = useTable(initiallyOrderedBy, dataset, filters);

  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.root}>
        <Paper className={classes.loadingWrapper}>
          <CircularProgress />
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {withHeader && (
          <HeaderToolbar
            numberItemsSelected={itemsSelectedCount}
            onClickDelete={onRemoveSelectedItems}
          />
        )}
        {withFilter && <Filter onFilter={onFilter} />}
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            className={classes.table}
            size="medium">
            <TableHead
              numberItemsSelected={itemsSelectedCount}
              onSelectAllClick={onSelectAllItems}
              datasetLength={dataset.length}
              withCheckboxes={withCheckboxes}
              onRequestSort={onRequestSort}
              headerCells={headerCells}
              orderBy={orderBy}
              order={order}
            />
            <TableBody>
              {items.map((rowData, index) => {
                const isItemSelected =
                  withCheckboxes && checkIsItemSelected(rowData[selectedVerifier]);
                const key = `enhanced-tableRow-${index}`;

                return (
                  <EnhancedTableRow
                    onClickTableRow={() => withCheckboxes && onSelectItem(rowData)}
                    isItemSelected={isItemSelected}
                    withCheckboxes={withCheckboxes}
                    cellsIds={fields}
                    rowData={rowData}
                    labelId={key}
                    key={key}
                  />
                );
              })}
              {numberEmptyRows > 0 && (
                <TableRow style={{ height: 53 * numberEmptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to === -1 ? count : to} of ${count}`
          }
          onChangePage={(_, newPage) => setPage(newPage)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          rowsPerPage={rowsPerPage}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          count={datasetCopy.length}
          page={currentPage}
          component="div"
        />
      </Paper>
    </div>
  );
};

export default memo(EnhancedTable, shouldComponentUpdate);
