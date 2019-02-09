import { ADD_NEW_TASK, PUT_IN_STORAGE } from '../actions/AddNewActions';
import {
	GET_TASKS_SUCCESS,
	STORAGE_REQUEST,
	REMOVE_TASK,
	COMPLETE_TASK,
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
	error: '',
	modalObjectId: '',
	objectModal: {},
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
		case COMPLETE_TASK:
			return {
				...state,
				tasks: action.payload,
			};

		case PUT_IN_STORAGE:
			return {
				...state,
				isEditing: false,
				currentID: '',
			};
		case ADD_NEW_TASK:
			let newTask = action.payload;
			const id = newTask.id;
			tasks = tasks.filter(item => item.id !== id);
			tasks.unshift(newTask);
			return {
				...state,
				tasks: tasks,
			};
		default:
			return state;
	}
}
