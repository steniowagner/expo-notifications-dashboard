import { SnackbarTypes } from '../../../../types';

export type Config = {
  type: keyof SnackbarTypes;
  duration?: number;
  message: string;
};

export type Types = {
  SENDING_NOTIFICATIONS_SUCCESS: string;
  SEND_NOTIFICATIONS_ERROR: string;
  SENDING_NOTIFICATIONS: string;
  LOADING_USERS_SUCCESS: string;
  LOADING_USERS_ERROR: string;
  MISSED_SELECT_USERS: string;
  LOADING_USERS: string;
};

type Configs = {
  [Type in keyof Types]: Config;
};

const configs: Configs = {
  LOADING_USERS: {
    message: 'Loading Users...',
    type: 'INFORMATION',
  },

  LOADING_USERS_ERROR: {
    message: 'There was a problem when trying to load users',
    duration: 3000,
    type: 'ERROR',
  },

  LOADING_USERS_SUCCESS: {
    message: 'Users loaded successfully',
    duration: 3000,
    type: 'SUCCESS',
  },

  MISSED_SELECT_USERS: {
    message: 'You must select at least one user',
    type: 'WARNING',
    duration: 3000,
  },

  SENDING_NOTIFICATIONS: {
    message: 'Sending notifications...',
    type: 'INFORMATION',
  },

  SENDING_NOTIFICATIONS_SUCCESS: {
    message: 'Notifications sent successfully',
    duration: 3000,
    type: 'SUCCESS',
  },

  SEND_NOTIFICATIONS_ERROR: {
    message: 'There was an error sending notifications',
    duration: 3000,
    type: 'ERROR',
  },
};

const getSnackbarConfig = (type: keyof Types): Config => configs[type];

export default getSnackbarConfig;
