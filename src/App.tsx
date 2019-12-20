import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

import HeaderBar from './components/common/HeaderBar';
import Snackbar from './components/common/snackbar/Snackbar';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
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
    <div
      className={classes.root}
    >
      <ThemeProvider
        theme={theme}
      >
        <HeaderBar />
        <Snackbar
          onClose={() => {}}
          duration={500}
          message="snackbarConfig.message"
          type="WARNING"
          isOpen
        />
      </ThemeProvider>
    </div>
  );
};

export default App;
