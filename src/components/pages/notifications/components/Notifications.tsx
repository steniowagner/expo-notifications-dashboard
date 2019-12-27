import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useNotificationsPage from '../../../../hooks/useNotificationsPage';
import Snackbar from '../../../common/Snackbar';
import ResultsModal from './ResultsModal';
import Form from './Form';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    widht: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4, 0, 4, 0),
  },
}));

const Notifications = () => {
  const {
    isNotificationsDialogResultsOpen,
    onCloseNotificationsResult,
    notificationsResult,
    sendNotifications,
    setSnackbarConfig,
    isSnackbarOpen,
    snackbarConfig,
    closeSnackbar,
    isLoading,
    users,
  } = useNotificationsPage();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form
        setNoUserSelectedError={() => setSnackbarConfig('MISSED_SELECT_USERS')}
        onSubmitForm={sendNotifications}
        loading={isLoading}
        users={users}
      />
      <ResultsModal
        isOpen={isNotificationsDialogResultsOpen}
        onClose={onCloseNotificationsResult}
        results={notificationsResult}
      />
      <Snackbar
        duration={snackbarConfig.duration}
        message={snackbarConfig.message}
        type={snackbarConfig.type}
        onClose={closeSnackbar}
        isOpen={isSnackbarOpen}
      />
    </div>
  );
};

export default Notifications;
