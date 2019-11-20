import { gameConstants } from "../actions/types";

const moves = [
  { move: "paper", kills: "rock" },
  { move: "rock", kills: "scissors" },
  { move: "scissors", kills: "paper" }
];

const initialState = {
  round: { round: 0, player: 0, results: [{}, {}, {}] },
  moves: moves
};

export default function(state = initialState, action) {
  switch (action.type) {
    case gameConstants.ENTER_PLAYERS_FINISHED:
      return {
        ...state,
        players: action.players,
        round: {
          ...state.round,
          round: 1,
          player: 1
        }
      };
    case gameConstants.CHANGE_ROUND:
      return {
        ...state,
        round: action.nextRound
      };
    case gameConstants.NEXT_PLAYER:
      return {
        ...state,
        round: {
          ...state.round,
          ...action.nextRound
        }
      };
    case gameConstants.NEW_GAME:
      return { ...initialState };
    default:
      return state;
  }
}
