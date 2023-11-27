import {combineContext, Observable} from '../index';

const ha = Observable(1);
const contextList = [{ha}];
export default combineContext(contextList)
