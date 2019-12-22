import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableSortLabel, TableCell, TableHead, TableRow, Checkbox } from '@material-ui/core';

import { HeaderCell, TableOrder } from '../../../types';

const useStyles = makeStyles(() => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

interface Props {
  onRequestSort: (property: string) => void;
  onSelectAllClick: () => void;
  numberItemsSelected: number;
  headerCells: HeaderCell[];
  withCheckboxes: boolean;
  datasetLength: number;
  order: TableOrder;
  orderBy: string;
}

const shouldComponentUpdate = (previousProps: Props, nextProps: Props) => {
  if (
    previousProps.orderBy !== nextProps.orderBy ||
    previousProps.numberItemsSelected !== nextProps.numberItemsSelected ||
    previousProps.order !== nextProps.order
  ) {
    return false;
  }

  return true;
};

const EnhancedTableHead = ({
  numberItemsSelected,
  onSelectAllClick,
  withCheckboxes,
  datasetLength,
  onRequestSort,
  headerCells,
  orderBy,
  order,
}: Props) => {
  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {withCheckboxes && (
          <TableCell padding="checkbox" align="left">
            <Checkbox
              indeterminate={numberItemsSelected > 0 && numberItemsSelected < datasetLength}
              inputProps={{ 'aria-label': 'select all desserts' }}
              checked={numberItemsSelected === datasetLength}
              onChange={onSelectAllClick}
              color="primary"
            />
          </TableCell>
        )}
        {headerCells.map(headerCell => (
          <TableCell
            sortDirection={orderBy === headerCell.id ? order : false}
            key={headerCell.id}
            align="left">
            <TableSortLabel
              onClick={createSortHandler(headerCell.id)}
              active={orderBy === headerCell.id}
              direction={order}>
              {headerCell.label}
              {orderBy === headerCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default memo(EnhancedTableHead, shouldComponentUpdate);
