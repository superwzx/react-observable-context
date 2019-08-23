
export const contexts = [];

const combineContext = (context) => {
    const name = Object.keys(context)[0];
    const observable = context[name];
    contexts.push({[name]: observable});
};

export default combineContext;
