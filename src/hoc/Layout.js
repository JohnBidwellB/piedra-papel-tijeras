import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  }
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <LinearProgress variant="determinate" value={20} />
        <Container maxWidth="sm">{props.children}</Container>
      </main>
    </div>
  );
};
export default Layout;
