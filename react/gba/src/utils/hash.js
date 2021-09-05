const Hash = {
  play(play) {
    return `${play.row.toString()},${play.col.toString()}`;
  },

  state(state) {
    return JSON.stringify(state.playHistory);
  },
};

export default Hash;
