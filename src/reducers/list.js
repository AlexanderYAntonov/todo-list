import { ADD_NEW_TASK, PUT_IN_STORAGE } from '../actions/AddNewActions';
import {
	GET_TASKS_SUCCESS,
	STORAGE_REQUEST,
	REMOVE_TASK,
} from '../actions/ListActions';
/*
tasks: [
		{
			id: 0, - task id
			title: 'Task1',
			description: 'Task description',
			date: '', - deadline date
			time: '', - deadline time
			close_date: '', - actual date of closing task
			close_time: '', - actual time of closing task
			done: false, - if task is done
		},
	],
*/

const initialState = {
	tasks: [],
	isFetching: false,
	isSaving: false,
	error: '',
	modalObjectId: '',
	objectModal: {},
	//	lastID: 0,
};

export function listReducer(state = initialState, action) {
	let tasks = state.tasks;
	switch (action.type) {
		case STORAGE_REQUEST:
			return { ...state, isFetching: true };
		case GET_TASKS_SUCCESS:
			return {
				...state,
				tasks: action.payload,
				isFetching: false,
			};
		case REMOVE_TASK:
			tasks = tasks.filter(item => item.id !== +action.payload);
			return {
				...state,
				tasks: tasks,
			};
		/*case GET_LIST_ERROR:
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

			tasks.push(newTask);
			return {
				...state,
				tasks: tasks,
			};
		default:
			return state;
	}
}
