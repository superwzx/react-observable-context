import { useContext, useEffect, useState } from 'react';
import ReactObservableContext from './context';

export const useObservableSelector = (selector) => {
  const state = useContext(ReactObservableContext);
  const [selectedState] = useState(() => selector(state));
  return selectedState;
};
