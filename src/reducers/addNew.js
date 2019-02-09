import { UPDATED_ID, CANCEL_EDITING } from '../actions/AddNewActions';
import { EDIT_TASK } from '../actions/ListActions';

const initialState = {
	lastID: 0,
	isEditing: false,
	currentID: 0,
};

export function addNewReducer(state = initialState, action) {
	switch (action.type) {
		case EDIT_TASK:
			return {
				...state,
				isEditing: true,
				currentID: +action.payload,
			};
		case CANCEL_EDITING:
			return {
				...state,
				isEditing: false,
				currentID: 0,
			};

		case UPDATED_ID:
			let updatedID = action.payload;
			let { lastID } = state;
			if (updatedID > lastID) {
				lastID = updatedID;
			}
			return {
				...state,
				lastID: lastID,
				isEditing: false,
				currentID: 0,
			};

		default:
			return state;
	}
}
