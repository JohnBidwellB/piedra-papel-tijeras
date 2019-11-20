import React, { Fragment } from "react";
import PlayersForm from "../components/Game/Players.form";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import RoundTitle from "../components/Game/RoundTitle";
import Results from "../components/Game/Results";
import Round from "../components/Game/Round";

const useStyles = makeStyles(theme => ({
  root: {
    // height: `${(window.innerHeight * 0, 7)}%`,
    // margin: 'auto'
  }
}));

const getScreen = round => {
  console.log(round === "round_1");
  console.log(typeof round);
  switch (round) {
    case 0:
      console.log("Ho");
      return <PlayersForm />;
    case 1:
      return <Round />;
    case 2:
      return <Round />;
    case 3:
      return (
        <Fragment>
          <Round />
          <Results />
        </Fragment>
      );

    case 4:
      return <Results />;

    case "round_1":
      console.log("Hi");
      return <RoundTitle />;
    default:
      console.log("he");
      return <PlayersForm />;
  }
};

const Game = props => {
  const classes = useStyles();
  const round = useSelector(state => state.game.round.round);
  console.log("Round: ", round);

  return <div className={classes.root}>{getScreen(round)}</div>;
};

export default Game;
