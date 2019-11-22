import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { gameConstants } from "../../actions/types";

const useStyles = makeStyles(theme => ({
  root: { width: "100%" },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  menu: {
    width: 200
  },
  moves: {
    width: "100%",
    position: "relative",
    overflow: "auto"
  }
}));

const NewMovement = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [move, setMove] = useState("");

  const updateForm = event => {
    setMove(event.target.value);
  };

  const handleSubmit = () => {
    dispatch({ type: gameConstants.NEW_MOVE, newMove: move });
    setMove("");
    dispatch({ type: gameConstants.CANCELL_ROUND });
  };

  return (
    <Grid container justify="center" alignItems="flex-end">
      {showForm && (
        <Grid item>
          <TextField
            required
            id="new-movement"
            label="Nuevo movimiento"
            placeholder="cat"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            onChange={updateForm}
            value={move}
          />
        </Grid>
      )}
      <Grid item>
        {showForm && (
          <Button color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        )}
        {!showForm && (
          <Button color="primary" onClick={() => setShowForm(true)}>
            Nuevo movimiento
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

const Movements = props => {
  const classes = useStyles();
  const movements = useSelector(state => state.game.moves);
  movements.map(movement => {
    movement.value = movement.move;
    movement.label = movement.move;
    return true;
  });
  const dispatch = useDispatch();

  const handleChange = move => event => {
    dispatch({
      type: gameConstants.UPDATE_MOVE,
      move: move.move,
      kills: event.target.value
    });
    dispatch({ type: gameConstants.CANCELL_ROUND });
  };

  const handleDelete = move => event => {
    dispatch({
      type: gameConstants.DELETE_MOVE,
      move: move.move
    });
    dispatch({ type: gameConstants.CANCELL_ROUND });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2" style={{ textAlign: "center" }}>
            Editar movimientos
          </Typography>
        </Grid>

        <Grid item>
          <NewMovement />
        </Grid>

        <div className={classes.moves}>
          <Grid item>
            {movements.map(move => (
              <Grid
                item
                container
                direction="row"
                spacing={4}
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography variant="h6">{move.move}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle2"> kills </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id={`${move.move}-kills-${move.kills}`}
                    select
                    dense
                    label="Select"
                    className={classes.textField}
                    value={move.kills}
                    onChange={handleChange(move)}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    margin="dense"
                    variant="outlined"
                  >
                    {movements
                      .filter(movement => movement.move !== move.move)
                      .map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={handleDelete(move)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Movements;
