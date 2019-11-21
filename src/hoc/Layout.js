import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Settings as SettingsIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flexGrow: 1
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxHeight: `${window.innerHeight * 0.8}px`
  },
  settingsIcon: {
    position: "absolute",
    top: 8,
    right: 8
  }
}));

const getProgresValue = round => {
  switch (round) {
    case 0:
      return 25;
    case 1:
      return 50;
    case 2:
      return 75;
    case 3:
      return 100;
    default:
      return 0;
  }
};
const Layout = props => {
  const classes = useStyles();

  const round = useSelector(state => state.game.round);
  const player1Wins = round.results.filter(result => result.winner === 1);
  const player2Wins = round.results.filter(result => result.winner === 2);

  let maxWinner =
    player1Wins.length > player2Wins.length
      ? player1Wins.length
      : player2Wins.length;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <LinearProgress
          variant="determinate"
          value={getProgresValue(maxWinner)}
        />
        <IconButton className={classes.settingsIcon}>
          <SettingsIcon />
        </IconButton>

        <div className={classes.container}>
          <Container maxWidth="sm">{props.children}</Container>
        </div>
      </main>
    </div>
  );
};
export default Layout;
