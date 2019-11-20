import React, {  } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Error404 = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1">Esta página no existe</Typography>
    </div>
  );
};

export default Error404;
