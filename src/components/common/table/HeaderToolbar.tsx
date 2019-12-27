import React, { memo } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Typography, Toolbar, Tooltip } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

interface Props {
  numberItemsSelected: number;
  onClickDelete: () => void;
}

const HeaderToolbar = ({ numberItemsSelected, onClickDelete }: Props) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numberItemsSelected > 0,
      })}>
      {numberItemsSelected > 0 ? (
        <Typography className={classes.title} variant="subtitle1" color="primary">
          {`${numberItemsSelected} selected`}
        </Typography>
      ) : (
        <Typography className={classes.title} id="tableTitle" variant="h6">
          Select users
        </Typography>
      )}

      {numberItemsSelected > 0 && (
        <Tooltip placement="left" title="Unselect all">
          <IconButton onClick={onClickDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default memo(HeaderToolbar);
