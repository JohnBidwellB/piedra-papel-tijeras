import React, { Fragment } from "react";
import PlayersForm from "../components/Game/Players";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import RoundTitle from "../components/Game/RoundTitle";
import Results from "../components/Game/Results";
import Round from "../components/Game/Round";
import Winner from "../components/Game/Winner";

const useStyles = makeStyles(theme => ({
  root: {
  }
}));

const getScreen = round => {
  switch (round.round) {
    case 0:
      return <PlayersForm />;
    case 1:
      return <Round key={`round-${round.round}-player-${round.player}`} />;
    case 2:
      return <Round key={`round-${round.round}-player-${round.player}`} />;
    case 3:
      return (
        <Fragment>
          <Round key={`round-${round.round}-player-${round.player}`} />
          <Results />
        </Fragment>
      );
    case 4:
      return <Winner />;

    case "round_1":
      return <RoundTitle />;
    default:
      return <PlayersForm />;
  }
};

const Game = props => {
  const classes = useStyles();
  const round = useSelector(state => state.game.round);

  return <div className={classes.root}>{getScreen(round)}</div>;
};

export default Game;
