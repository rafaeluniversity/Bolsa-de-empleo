import { createContext } from 'react';

const LoadingContext = createContext({
  showLoader: false,
  showLoading: () => {},
  closeLoading: () => {}
});

export default LoadingContext;