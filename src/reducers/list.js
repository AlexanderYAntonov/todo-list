import { ADD_NEW_TASK, PUT_IN_STORAGE } from '../actions/AddNewActions';

const initialState = {
	tasks: [
		{
			id: 0,
			title: 'Task1',
			description: 'Task description',
			date: '',
			time: '',
			close_date: '',
			close_time: '',
			done: false,
		},
	],
	isFetching: false,
	isSaving: false,
	error: '',
	modalObjectId: '',
	objectModal: {},
	lastID: 0,
};

export function listReducer(state = initialState, action) {
	switch (action.type) {
		/*case GET_LIST_REQUEST:
			return { ...state, cadastrString: action.payload, isFetching: true };
		case GET_LIST_SUCCESS:
			return { ...state, objects: action.payload, isFetching: false };
		case GET_LIST_ERROR:
			return {
				...state,
				objects: [],
				isFetching: false,
				error: action.payload,
			};
		case SHOW_DETAILS_REQUEST:
			return {
				...state,
				modalObjectId: action.payload,
			};
		case SHOW_DETAILS_SUCCESS:
			return {
				...state,
				objectModal: action.payload,
			};
		case SHOW_DETAILS_ERROR:
			return {
				...state,
				error: action.payload,
			};*/
		case PUT_IN_STORAGE:
			return {
				...state,
				isSaving: true,
			};
		case ADD_NEW_TASK:
			let newTask = action.payload;
			const id = newTask.id;
			let tasks = state.tasks;
			console.log('id=', id);
			if (id !== undefined) {
				tasks = tasks.filter(item => item.id !== id);
			} else {
				newTask.id = state.lastID + 1;
			}
			tasks.push(newTask);
			return {
				...state,
				tasks: tasks,
				isSaving: false,
				lastID: newTask.id,
			};
		default:
			return state;
	}
}
