import { UPDATED_ID } from '../actions/AddNewActions';

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const STORAGE_REQUEST = 'STORAGE_REQUEST';
export const REMOVE_TASK = 'REMOVE_TASK';

export function removeTask(id) {
	//update storage
	let tasks = JSON.parse(localStorage.getItem('tasks'));

	tasks = tasks.filter(item => item.id !== +id);
	console.log('tasks, id', tasks, id);
	try {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	} catch (e) {
		if (e.name === 'QUOTA_EXCEEDED_ERR') {
			console.log('Превышен лимит LocalStorage');
		}
	}

	//dispatch action
	return dispatch => {
		dispatch({
			type: REMOVE_TASK,
			payload: id,
		});
	};
}

export function getTasksFromStorage() {
	console.log('Get tasks from storage');
	return dispatch => {
		dispatch({
			type: STORAGE_REQUEST,
		});

		let tasks = JSON.parse(localStorage.getItem('tasks'));
		let lastID = 0;

		//if storage is empty
		if (!tasks) {
			tasks = [];
		} else {
			tasks.forEach(item => {
				if (item.id > lastID) {
					lastID = item.id;
				}
			});
			dispatch({
				type: UPDATED_ID,
				payload: lastID,
			});
		}
		console.log('Got tasks', tasks);

		dispatch({
			type: GET_TASKS_SUCCESS,
			payload: tasks,
		});
	};
}
