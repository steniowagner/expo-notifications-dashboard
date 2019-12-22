import snackbarTypes from '../../../common/snackbar/types';

const types = {
  LOADING_USERS: 'LOADING_USERS',
  LOADING_USERS_ERROR: 'LOADING_USERS_ERROR',
  MISSED_SELECT_USERS: 'MISSED_SELECT_USERS',
  SENDING_NOTIFICATIONS: 'SENDING_NOTIFICATIONS',
  SEND_NOTIFICATIONS_ERROR: 'SEND_NOTIFICATIONS_ERROR',
};

const snackBarConfig = {
  [types.LOADING_USERS]: {
    message: 'Loading Users...',
    config: snackbarTypes.INFORMATION,
  },

  [types.LOADING_USERS_ERROR]: {
    message: 'There was a problem when trying to load users',
    config: snackbarTypes.ERROR,
    duration: 3000,
  },

  [types.MISSED_SELECT_USERS]: {
    message: 'You must select at least one user',
    config: snackbarTypes.WARNING,
    duration: 3000,
  },

  [types.SENDING_NOTIFICATIONS]: {
    message: 'Sending notifications...',
    config: snackbarTypes.INFORMATION,
  },

  [types.SEND_NOTIFICATIONS_ERROR]: {
    message: 'There was an error sending notifications',
    config: snackbarTypes.ERROR,
    duration: 3000,
  },
};

export default snackBarConfig;
