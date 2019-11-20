import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import game from "./game.reducer";

export default history =>
  combineReducers({ game, router: connectRouter(history) });
