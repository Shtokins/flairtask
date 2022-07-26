export interface IState {
  currentScore: number;
  currentFrame: number;
  currentFrameScore: number;
  currentThrow: number;
  scoresByFrame: IScoreByFrame[];
  lastExtraThrow: boolean;
}

export interface INewScores {
  currentScore: number;
  currentFrame: number;
  currentFrameScore?: number;
  currentThrow: number;
  scoresByFrame?: IScoreByFrame[];
  lastExtraThrow: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IScoreByFrame {
  score: number;
  desc: string | null;
  frame: number;
  key: string;
  frameThrows: string;
}
