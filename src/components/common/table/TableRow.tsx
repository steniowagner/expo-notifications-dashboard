import React, { MouseEvent } from 'react';
import { TableCell, TableRow, Checkbox } from '@material-ui/core';

interface Props {
  onClickTableRow: (event: MouseEvent<HTMLElement>, id: string) => void;
  isItemSelected: boolean;
  withCheckboxes: boolean;
  cellsIds: string[];
  labelId: string;
  rowData: any;
}

const EnhancedTableRow = ({
  onClickTableRow, isItemSelected, withCheckboxes, cellsIds, labelId, rowData,
}: Props) => {
  if (!cellsIds) {
    return null;
  }

  return (
    <TableRow
      onClick={(event: MouseEvent<HTMLElement>) => onClickTableRow(event, rowData.id)}
      aria-checked={isItemSelected}
      selected={isItemSelected}
      role="checkbox"
      tabIndex={-1}
      hover
    >
      {withCheckboxes && (
        <TableCell
          padding="checkbox"
        >
          <Checkbox
            inputProps={{ 'aria-labelledby': labelId }}
            checked={isItemSelected}
            color="primary"
          />
        </TableCell>
      )}
      {cellsIds.map((cellId) => (
        <TableCell
          key={cellId}
          align="left"
        >
          {rowData[cellId]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default EnhancedTableRow;
