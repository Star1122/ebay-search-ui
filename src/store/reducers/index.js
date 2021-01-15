import { combineReducers } from 'redux';

import retriever from './retriever';
import theme from './theme';

export default combineReducers({
  retriever,
  theme,
});
