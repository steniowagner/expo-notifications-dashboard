import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Notifications from './pages/notifications/components/Notifications';
import HeaderBar from './common/HeaderBar';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
    backgroundColor: grey[50],
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      500: '#0a64ff',
    },
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <HeaderBar />
        <Notifications />
      </ThemeProvider>
    </div>
  );
};

export default App;
