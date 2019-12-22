import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Form from './form/Form';

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
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Form
        setNoUserSelectedError={() => {}}
        onSubmitForm={() => {}}
        loading={false}
        users={[]}
      />
    </div>
  );
};

export default Notifications;
