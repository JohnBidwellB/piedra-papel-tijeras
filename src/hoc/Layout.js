import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  content: {
    flexGrow: 1
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: '100%',
    maxHeight: `${window.innerHeight * 0.8}px`
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
        <div className={classes.container}>
          <Container maxWidth="sm">{props.children}</Container>
        </div>
      </main>
    </div>
  );
};
export default Layout;
