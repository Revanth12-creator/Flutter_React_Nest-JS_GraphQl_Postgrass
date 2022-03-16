const ActionTypes = {
  WRITE: "[Write] Update  variable",
};

const write = (a: number) => {
  return {
    type: ActionTypes.WRITE, // required, unique
    a,
  };
};

export default { write, ActionTypes };
