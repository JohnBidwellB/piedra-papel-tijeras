import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  LinearProgress,
  IconButton,
  Button
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

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
    maxHeight: `${window.innerHeight * 0.9}px`
  },
  settingsIcon: {
    position: "absolute",
    top: 8,
    right: 8
  },
  back: {
    position: "absolute",
    top: 8,
    left: 8
  },
  arrowIcon: {
    fontSize: 32
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
  let history = useHistory();
  const round = useSelector(state => state.game.round);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <LinearProgress
          variant="determinate"
          value={getProgresValue(round.round)}
        />
        <div className={classes.back}>
          <Button onClick={() => history.goBack()}>
            <ArrowBackIcon className={classes.arrowIcon} /> Volver al juego
          </Button>
        </div>
        {/* <Link to={{ pathname: "/movements" }}> */}
        <IconButton
          className={classes.settingsIcon}
          // onClick={() => <Redirect to="/movements" push={true} />}
          onClick={() => history.push("/movements")}
        >
          <SettingsIcon />
        </IconButton>
        {/* </Link> */}
        <div className={classes.container}>
          <Container maxWidth="sm">{props.children}</Container>
        </div>
      </main>
    </div>
  );
};
export default Layout;
