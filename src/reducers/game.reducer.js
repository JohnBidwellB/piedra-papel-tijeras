import { gameConstants } from "../actions/types";

const moves = [
  { move: "paper", kills: "rock" },
  { move: "rock", kills: "scissors" },
  { move: "scissors", kills: "paper" }
];

const initialState = {
  round: {
    round: 0,
    player: 0,
    results: [{ round: 1, player_1: "", player_2: "", winner: -1 }]
  },
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
      return { ...initialState, wins: state.wins };
    case gameConstants.SET_ROUND_WINNER:
      return {
        ...state,
        round: {
          ...state.round,
          results: state.round.results.map(result => {
            if (result.round !== action.round.round) {
              return result;
            }
            return { ...action.round };
          })
        }
      };
    case gameConstants.ADD_ROUND:
      return {
        ...state,
        round: {
          ...state.round,
          results: [
            ...state.round.results,
            {
              round: state.round.round,
              player_1: "",
              player_2: "",
              winner: -1
            }
          ]
        }
      };
    case gameConstants.FINISH_GAME:
      const wins = {
        ...state.wins
      };
      let hasWinned = wins[action.player.name];
      if (hasWinned) {
        wins[action.player.name] = wins[action.player.name] + 1;
      } else {
        wins[action.player.name] = 1;
      }
      return {
        ...state,
        round: {
          ...state.round,
          round: -1,
          player: action.winner
        },
        wins: {
          ...wins
        }
      };
    case gameConstants.GO_TO_RANKING:
      return {
        ...state,
        round: {
          ...state.round,
          round: -2
        }
      };
    case gameConstants.NEW_MOVE:
      return {
        ...state,
        moves: [...state.moves, { move: action.newMove, kills: "" }]
      };
    case gameConstants.DELETE_MOVE:
      const moves = state.moves.filter(move => move.move !== action.move);
      return {
        ...state,
        moves: moves.map(move => {
          if (move.move !== action.move && move.kills !== action.move) {
            return move;
          } else if (move.move !== action.move && move.kills === action.move) {
            return { move: move.move, kills: "" };
          }
          return true
        })
      };
    case gameConstants.UPDATE_MOVE:
      return {
        ...state,
        moves: state.moves.map(move => {
          if (move.move !== action.move) {
            return move;
          }
          return {
            ...move,
            kills: action.kills
          };
        })
      };
    case gameConstants.CANCELL_ROUND:
      let lastRound = state.round.results.slice(-1)[0];
      let needToCancel = lastRound.player_1 !== "";
      if (needToCancel) {
        lastRound.winner = 0;
      }
      return needToCancel
        ? {
            ...state,
            round: {
              ...state.round,
              round: state.round.round + 1,
              player: 1,
              results: [
                state.round.results.slice(0, -1),
                lastRound,
                {
                  round: state.round.round + 1,
                  player_1: "",
                  player_2: "",
                  winner: -1
                }
              ]
            }
          }
        : state;

    default:
      return state;
  }
}
