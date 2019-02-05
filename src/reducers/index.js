import { combineReducers } from 'redux';
import { listReducer } from './list';
import { addNewReducer } from './addNew';
export const rootReducer = combineReducers({
	list: listReducer,
	addNew: addNewReducer,
});
