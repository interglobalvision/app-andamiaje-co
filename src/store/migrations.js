export const migrations = {
  1: ({_persist}) => {
    return {_persist}; // reset all state, except version
  },
  2: (state) => {
    return {
      ...state,
      catalogos: undefined,
      countdown: undefined,
      calendar: undefined,
    }; // reset all state, except version
  },
  3: (state) => {
    return {
      ...state,
      catalogos: undefined,
      countdown: undefined,
      calendar: undefined,
    }; // reset all state, except version
  },
}
