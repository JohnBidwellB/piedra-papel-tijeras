import React from "react";
import PlayersForm from "../components/Game/Players.form";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    // height: `${(window.innerHeight * 0, 7)}%`,
    // margin: 'auto'
  }
}));

const Game = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PlayersForm />
    </div>
  );
};

export default Game;
