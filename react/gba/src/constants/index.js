export const CELL_SIZE = 30;
export const BOARD_SIZE = 30;
export const EMPTY = 0;
export const BLACK = -1;
export const WHITE = 1;
export const DEATH = 3;
export const ROWS = 15;
export const COLS = 15;

export const GameStatus = {
  STOP: 0,
  START: 1,
  FINISH: 2,
};

export const Score = {
  Kill2: 10,
  Kill3_1: 30,
  Kill3_2: 40,
  Kill4_1: 60,
  Kill4_2: 110,
  Kill5: 50100,
  Live1: 0,
  Live2: 10,
  Dead3: 25,
  Live3: 50,
  Dead4: 55,
  Live4: 100,
  Live5: 90000,
};

export const AIMode = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};
