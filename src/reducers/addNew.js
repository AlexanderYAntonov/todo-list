import { UPDATED_ID } from '../actions/AddNewActions';

const initialState = {
	lastID: 0,
};

export function addNewReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATED_ID:
			let updatedID = action.payload;
			let { lastID } = state;
			if (updatedID > lastID) {
				lastID = updatedID;
			}
			return {
				...state,
				lastID: lastID,
			};

		default:
			return state;
	}
}
