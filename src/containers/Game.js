import React from "react";
import PlayersForm from "../components/Game/Players";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Results from "../components/Game/Results";
import Round from "../components/Game/Round";
import Winner from "../components/Game/Winner";
import Ranking from "../components/Game/Ranking";
import { Grid, Button } from "@material-ui/core";
import { gameConstants } from "../actions/types";
const useStyles = makeStyles(theme => ({
  root: {}
}));

const getScreen = (round, button) => {
  switch (round.round) {
    case 0:
      return (
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <PlayersForm />
          </Grid>
          <Grid item>{button}</Grid>
        </Grid>
      );
    case 1:
    case 2:
      return <Round key={`round-${round.round}-player-${round.player}`} />;
    case -1:
      return <Winner />;
    case -2:
      return (
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <Ranking />
          </Grid>
          <Grid item>{button}</Grid>
        </Grid>
      );
    default:
      return (
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Round key={`round-${round.round}-player-${round.player}`} />
          </Grid>
          <Grid item>
            <Results />
          </Grid>
        </Grid>
      );
  }
};

const Game = props => {
  const classes = useStyles();
  const round = useSelector(state => state.game.round);
  const dispatch = useDispatch();

  const rankingButton = (
    <Button
      color="primary"
      onClick={() => dispatch({ type: gameConstants.GO_TO_RANKING })}
    >
      Ranking
    </Button>
  );

  const newGameButton = (
    <Button
      color="primary"
      onClick={() => dispatch({ type: gameConstants.NEW_GAME })}
    >
      Nueva partida
    </Button>
  );

  if (round.round === 0)
    return (
      <div className={classes.root}>{getScreen(round, rankingButton)}</div>
    );
  else if (round.round === -2)
    return (
      <div className={classes.root}>{getScreen(round, newGameButton)}</div>
    );
  else return <div className={classes.root}>{getScreen(round)}</div>;
};

export default Game;
