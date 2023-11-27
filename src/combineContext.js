
export const contexts = {};

const combineContext = (contextList) => {
  Object.assign(contexts, ...contextList);
  return contexts;
};

export default combineContext;
