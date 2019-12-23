import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useNotificationsPage from '../hooks/useNotificationsPage';
import Snackbar from '../../../common/Snackbar';
import Form from './form/Form';

const useStyles = makeStyles((theme) => ({
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
    sendNotifications,
    setSnackbarConfig,
    setIsSnackbarOpen,
    isSnackbarOpen,
    snackbarConfig,
    isLoading,
    users,
  } = useNotificationsPage();

  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Form
        setNoUserSelectedError={() => setSnackbarConfig('MISSED_SELECT_USERS')}
        onSubmitForm={sendNotifications}
        loading={isLoading}
        users={users}
      />
      <Snackbar
        onClose={() => setIsSnackbarOpen(false)}
        duration={snackbarConfig.duration}
        message={snackbarConfig.message}
        type={snackbarConfig.type}
        isOpen={isSnackbarOpen}
      />
    </div>
  );
};

export default Notifications;
