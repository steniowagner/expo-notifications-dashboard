import React from 'react';
import {
  DialogContentText,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Dialog,
} from '@material-ui/core';
import { blueGrey, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Table from '../../../common/table/Table';
import {
  pushNotificationsErrorsTableConfig,
  tokensNotRegisteredTableConfig,
} from '../../../common/table/configs';
import { TableConfig, User } from '../../../../types';

const useStyles = makeStyles((theme) => ({
  providerIcon: {
    display: 'flex',
    widht: '100%',
    alignItems: 'center',
  },
  providerItem: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  providerWrapper: {
    width: '100%',
  },
  providerIconWrapper: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  androidIconWrapper: {
    backgroundColor: green[200],
  },
  androidIcon: {
    fontSize: theme.spacing(3.6),
    color: green[700],
  },
  appleIconWrapper: {
    backgroundColor: blueGrey[300],
  },
  appleIcon: {
    fontSize: theme.spacing(3.6),
    color: theme.palette.common.white,
    paddingBottom: 4,
  },
  wrapperWithMarginBottom: {
    marginBottom: theme.spacing(6),
  },
  table: {
    width: '100%',
  },
}));

const TOKENS_NOT_REGISTERED_MESSAGE = 'The following users uninstalled the app of their devices and will not be listed to receive notifications anymore:';
const SEND_NOTIFICATION_ERROR_MESSAGE = 'The following notifications were not delivered to the users:';

type ShippingError = {
  reason: string;
  user: User;
};

type Results = {
  shippingErrors: ShippingError[],
  usersNotRegistered: User[],
}

interface Props {
  onClose: () => void;
  results: Results;
  isOpen: boolean;
}

interface ResultTableParams {
  dataset: User[] | (User & { reason: string })[];
  wrapperWithMarginBottom: boolean;
  config: TableConfig;
  title: string;
}

const ResultsModal = ({
  onClose,
  isOpen,
  results,
}: Props) => {
  const classes = useStyles();

  const renderProviderData = () => (
    <DialogContentText
      id="scroll-dialog-description"
      tabIndex={-1}
    >
      All notifications have been successfully sent to their respective providers!
    </DialogContentText>
  );

  const renderResultTables = ({
    wrapperWithMarginBottom,
    dataset,
    config,
    title,
  }: ResultTableParams) => (
    <div
      className={clsx(classes.table, {
        [classes.wrapperWithMarginBottom]: wrapperWithMarginBottom === true,
      })}
    >
      <Typography
        variant="body1"
      >
        {title}
      </Typography>
      <Table
        withCheckboxes={false}
        itemsSelectedCount={0}
        withHeader={false}
        withFilter={false}
        dataset={dataset}
        loading={false}
        config={config}
      />
    </div>
  );

  const hasUsersNotRegistered = results && !!results.usersNotRegistered.length;

  const isSendNotificationsSuccessful = results
    && !results.usersNotRegistered.length && !results.shippingErrors.length;

  const hasErrors = results && !!results.shippingErrors.length;

  return (
    <Dialog
      aria-describedby="shows-results-modal"
      aria-labelledby="results-modal"
      disableBackdropClick
      onClose={onClose}
      maxWidth="lg"
      scroll="paper"
      open={isOpen}
    >
      <DialogTitle
        id="scroll-dialog-title"
      >
        Notifications sent
      </DialogTitle>
      <DialogContent>
        {isSendNotificationsSuccessful && renderProviderData()}
        {hasErrors && renderResultTables({
          config: pushNotificationsErrorsTableConfig,
          title: SEND_NOTIFICATION_ERROR_MESSAGE,
          wrapperWithMarginBottom: true,
          dataset: results.shippingErrors.map(({ user, reason }) => ({
            ...user,
            reason,
          })),
        })}
        {hasUsersNotRegistered && renderResultTables({
          config: tokensNotRegisteredTableConfig,
          title: TOKENS_NOT_REGISTERED_MESSAGE,
          dataset: results.usersNotRegistered,
          wrapperWithMarginBottom: false,
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsModal;
