import { UPDATED_ID } from '../actions/AddNewActions';

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const STORAGE_REQUEST = 'STORAGE_REQUEST';
export const REMOVE_TASK = 'REMOVE_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export function editTask(id) {
	//dispatch action
	return dispatch => {
		dispatch({
			type: EDIT_TASK,
			payload: id,
		});
	};
}

//set tasks in storage
const setTasks = tasks => {
	try {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	} catch (e) {
		if (e.name === 'QUOTA_EXCEEDED_ERR') {
			console.log('Превышен лимит LocalStorage');
		}
	}
};

export function completeTask(id) {
	//update storage
	let tasks = JSON.parse(localStorage.getItem('tasks'));

	//get close time and date
	const datetime = new Date();

	let values = [
		datetime.getDate(),
		datetime.getMonth() + 1,
		datetime.getHours(),
		datetime.getMinutes(),
	];
	for (let id in values) {
		values[id] = values[id].toString().replace(/^([0-9])$/, '0$1');
	}
	const year = datetime.getFullYear();

	tasks = tasks.map(item => {
		if (item.id === +id) {
			item.done = true;
			item.close_date = year + '-' + values[1] + '-' + values[2];
			item.close_time = values[2] + '-' + values[3];
		}
		return item;
	});

	setTasks(tasks);

	//dispatch action
	return dispatch => {
		dispatch({
			type: COMPLETE_TASK,
			payload: tasks,
		});
	};
}

export function removeTask(id) {
	//update storage
	let tasks = JSON.parse(localStorage.getItem('tasks'));

	tasks = tasks.filter(item => item.id !== +id);

	setTasks(tasks);

	//dispatch action
	return dispatch => {
		dispatch({
			type: REMOVE_TASK,
			payload: id,
		});
	};
}

export function getTasksFromStorage() {
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

		dispatch({
			type: GET_TASKS_SUCCESS,
			payload: tasks,
		});
	};
}
