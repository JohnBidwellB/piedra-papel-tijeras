import { gameConstants } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case gameConstants.ENTER_PLAYERS:
      return {
        players: action.players
      };
    default:
      return state;
  }
}
