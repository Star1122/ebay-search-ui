import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginLeft: theme.spacing(2.5),
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  toggleButton: {
    marginLeft: theme.spacing(2),
  },
}));

function TopBar() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
    </Box>
  );
}

export default withRouter(TopBar);
