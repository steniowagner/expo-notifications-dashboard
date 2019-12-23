import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import useNotificationsPage from '../hooks/useNotificationsPage';
import Snackbar from '../../../common/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    widht: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4, 0, 4, 0),
    backgroundColor: grey[50],
  },
}));

const Notifications = () => {
  const { setIsSnackbarOpen, isSnackbarOpen, snackbarConfig } = useNotificationsPage();
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
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
