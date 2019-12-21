import React, { useState, memo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FilterIcon from '@material-ui/icons/FilterList';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      width: 240,
      justifyContent: 'center',
      margin: theme.spacing(1.8, 0, 0, 1.8),
    },
    search: {
      width: '100%',
      height: theme.spacing(5),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    filterIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(0, 1.8, 0, 1.8),
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      width: '100%',
    },
  }),
);

interface Props {
  onFilter: (value: string) => void;
}

const Filter = ({ onFilter }: Props) => {
  const [filterValue, setFilterValue] = useState<string>('');
  const classes = useStyles();

  const onFilterValueChange = (value: string) => {
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.filterIcon}>
          <FilterIcon />
        </div>
        <InputBase
          onChange={({ target }) => onFilterValueChange(target.value)}
          inputProps={{ 'aria-label': 'filter' }}
          classes={{
            input: classes.inputInput,
            root: classes.inputRoot,
          }}
          placeholder="Search"
          value={filterValue}
        />
      </div>
    </div>
  );
};

export default memo(Filter);
