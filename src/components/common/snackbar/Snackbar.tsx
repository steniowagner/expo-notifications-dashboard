import React from 'react';
import { SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
import { indigo, amber, grey, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
  CheckCircle as CheckCircleIcon,
  HelpOutline as IconNotFound,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import types from './types';

const useContetStyles = makeStyles(theme => ({
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const useSnackbarStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: indigo[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  unkown: {
    backgroundColor: grey[400],
  },
}));

type Class = Record<'success' | 'error' | 'info' | 'warning' | 'unkown', string>;

type Type = 'INFORMATION' | 'WARNING' | 'SUCCESS' | 'ERROR';

const getConfig = (classes: Class, type: Type) => {
  switch (type) {
    case types.INFORMATION:
      return {
        Icon: InfoIcon,
        className: classes.info,
      };

    case types.ERROR:
      return {
        Icon: ErrorIcon,
        className: classes.error,
      };

    case types.SUCCESS:
      return {
        Icon: CheckCircleIcon,
        className: classes.success,
      };

    case types.WARNING:
      return {
        Icon: WarningIcon,
        className: classes.warning,
      };

    default:
      return {
        Icon: IconNotFound,
        className: classes.unkown,
      };
  }
};

interface Props {
  type: 'INFORMATION' | 'WARNING' | 'SUCCESS' | 'ERROR';
  onClose: () => void;
  duration: number;
  message: string;
  isOpen: boolean;
}

const CustomSnackbar = ({ duration, onClose, message, isOpen, type }: Props) => {
  const snackbarStyles = useSnackbarStyles();
  const classes = useContetStyles();

  const { Icon, className } = getConfig(snackbarStyles, type);

  const onClickClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      autoHideDuration={duration}
      onClose={onClickClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}>
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={className}
        message={
          <span className={classes.message} id="client-snackbar">
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton aria-label="close" onClick={onClose} color="inherit" key="close">
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
