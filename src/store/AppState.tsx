/* eslint-disable no-shadow */
import { useReducer, useRef } from "react";
import { AppContext } from "./appContext";
import { appReducer } from "./appReducer";
import * as t from "./actionTypes";
import { IState, INewScores, IScoreByFrame } from "../models/intarfaces";
import { GAME_TYPES } from "../models/constants";

export const initialState: IState = {
  currentScore: 0,
  currentFrame: 1,
  currentFrameScore: 0,
  currentThrow: 1,
  scoresByFrame: [],
  lastExtraThrow: false
};

export const AppState = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    currentScore, // total score
    currentFrame, // # of the current frame
    currentThrow, // # of the current throw
    scoresByFrame, // frames storage
    currentFrameScore, // score for previous throws in current frame
    lastExtraThrow // if the current throw is extra in 10th frame
  } = state;

  const lastFrameLog = useRef("");
  const lastFrameType = useRef("");

  const knockPins = (amount: string) => {
    // Initial conditions:

    const pinsAmount: number = Number(amount) || 0;
    const isStrike: boolean = currentThrow === 1 && pinsAmount === 10;
    const isLastFrame: boolean = currentFrame === 10;
    const totalFrameScore: number = currentFrameScore + pinsAmount;
    const isSpare: boolean = !isStrike && totalFrameScore === 10;
    const lastExtraThrow: boolean =
      isLastFrame &&
      (isStrike || isSpare || currentFrameScore >= 10) &&
      currentThrow < 3;
    const nextFrame: boolean =
      (isStrike || currentThrow > 1) && currentFrame <= 10 && !lastExtraThrow;

    // Next state values calculation

    const newScores: INewScores = {
      currentThrow: lastExtraThrow ? currentThrow + 1 : nextFrame ? 1 : 2,
      currentScore: currentScore + pinsAmount,
      currentFrame: nextFrame ? currentFrame + 1 : currentFrame,
      currentFrameScore: lastExtraThrow
        ? currentFrameScore + pinsAmount
        : nextFrame
        ? 0
        : pinsAmount,
      lastExtraThrow
    };

    // Add the frame to the storage if it's done
    if (nextFrame) {
      const frameThrows: string = isStrike
        ? "10"
        : `${currentFrameScore}/${pinsAmount}`;
      newScores.scoresByFrame = [
        ...scoresByFrame,
        {
          score: isStrike ? 10 : totalFrameScore,
          desc:
            lastFrameType.current ||
            (isStrike && GAME_TYPES.STRIKE) ||
            (isSpare && GAME_TYPES.SPARE) ||
            null,
          frame: currentFrame,
          key: "key" + currentFrame,
          frameThrows: lastFrameLog.current
            ? lastFrameLog.current + "/" + pinsAmount
            : frameThrows
        }
      ];
      // 10th frame's extra throws processing:
    } else if (lastExtraThrow) {
      if (isStrike) {
        lastFrameType.current = GAME_TYPES.STRIKE;
        lastFrameLog.current = "10";
      } else if (!lastFrameType.current && isSpare) {
        lastFrameLog.current = `${currentFrameScore}/${pinsAmount}`;
        lastFrameType.current = GAME_TYPES.SPARE;
      } else {
        lastFrameLog.current += "/" + pinsAmount;
      }
    }

    // === Contitions and score addition for Strikes and Spares ===
    const previousRound: IScoreByFrame | null = scoresByFrame[
      scoresByFrame.length - 1
    ]
      ? { ...scoresByFrame[scoresByFrame.length - 1] }
      : null;

    let prePreviousRound: IScoreByFrame | null = null;
    if (
      previousRound &&
      ((previousRound.desc === GAME_TYPES.STRIKE && currentThrow <= 2) ||
        (previousRound.desc === GAME_TYPES.SPARE && currentThrow === 1))
    ) {
      previousRound.score = previousRound.score + pinsAmount;
      previousRound.frameThrows = previousRound.frameThrows + "/" + pinsAmount;
      newScores.currentScore = newScores.currentScore + pinsAmount;

      // if we had Strikes 2 frames a row, we need to add last score to the previos frame and to the one before the previous:

      if (previousRound.desc === GAME_TYPES.STRIKE && currentThrow === 1) {
        prePreviousRound = scoresByFrame[scoresByFrame.length - 2]
          ? { ...scoresByFrame[scoresByFrame.length - 2] }
          : null;
      }

      if (prePreviousRound && prePreviousRound.desc === GAME_TYPES.STRIKE) {
        prePreviousRound.score = prePreviousRound.score + pinsAmount;
        prePreviousRound.frameThrows =
          prePreviousRound.frameThrows + "/" + pinsAmount;
        newScores.currentScore = newScores.currentScore + pinsAmount;
      }

      // After additions to previous frames we will change them in state:

      if (newScores.scoresByFrame) {
        newScores.scoresByFrame[newScores.scoresByFrame.length - 2] =
          previousRound;
        if (prePreviousRound) {
          newScores.scoresByFrame[newScores.scoresByFrame.length - 3] =
            prePreviousRound;
        }
      } else {
        newScores.scoresByFrame = [...scoresByFrame];
        newScores.scoresByFrame[newScores.scoresByFrame.length - 1] =
          previousRound;
        if (prePreviousRound) {
          newScores.scoresByFrame[newScores.scoresByFrame.length - 2] =
            prePreviousRound;
        }
      }
    }

    dispatch({
      type: t.KNOCK_PINS,
      payload: newScores
    });
  };

  const startNewGame = () => {
    lastFrameLog.current = "";
    lastFrameType.current = "";
    dispatch({
      type: t.START_NEW_GAME
    });
  };

  const value = {
    currentScore,
    currentFrame,
    currentThrow,
    scoresByFrame,
    currentFrameScore,
    lastExtraThrow,
    knockPins,
    startNewGame
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
