import { IAction, IState, INewScores } from "../models/intarfaces";
import * as t from "./actionTypes";
import { initialState } from "./AppState";

const handlers: any = {
  [t.KNOCK_PINS]: (state: IState, { payload }: { payload: INewScores }) => {
    return {
      ...state,
      ...payload
    };
  },
  [t.START_NEW_GAME]: (state: IState) => {
    return {
      ...state,
      ...initialState,
      scoresByFrame: []
    };
  },

  DEFAULT: (state: IState) => state
};

export const appReducer = (state: IState, action: IAction) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
