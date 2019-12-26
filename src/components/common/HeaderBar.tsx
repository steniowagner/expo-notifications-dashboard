import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar } from '@material-ui/core/';

import { NotificationsActive as NotificationsActiveIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logoWrapper: {
    display: 'flex',
    width: theme.spacing(5),
    height: theme.spacing(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(2.5),
    backgroundColor: theme.palette.common.white,
  },
}));

const HeaderBar = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <AppBar
        position="static"
        color="primary"
      >
        <Toolbar>
          <div
            className={classes.logoWrapper}
          >
            <NotificationsActiveIcon
              fontSize="small"
              color="primary"
            />
          </div>
          <Typography
            className={classes.title}
            variant="h6"
          >
            Notifications Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
