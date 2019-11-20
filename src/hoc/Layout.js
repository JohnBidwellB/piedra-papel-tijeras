import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  }
}));

const getProgresValue = round => {
  switch (round) {
    case 0:
      return 20;
    case 1:
      return 40;
    case 2:
      return 60;
    case 3:
      return 80;
    case 4:
      return 100;
    default:
      return 0;
  }
};
const Layout = props => {
  const classes = useStyles();

  const round = useSelector(state => state.game.round);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <LinearProgress
          variant="determinate"
          value={getProgresValue(round.round)}
        />
        <Container maxWidth="sm">{props.children}</Container>
      </main>
    </div>
  );
};
export default Layout;
