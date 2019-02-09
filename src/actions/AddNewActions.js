export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const PUT_IN_STORAGE = 'PUT_IN_STORAGE';
export const UPDATED_ID = 'UPDATED_ID';
export const CANCEL_EDITING = 'CANCEL_EDITING';

export function cancelEditing() {
	return dispatch => {
		dispatch({
			type: CANCEL_EDITING,
		});
	};
}

export function handleAdd(task) {
	return dispatch => {
		dispatch({
			type: PUT_IN_STORAGE,
			payload: task,
		});

		let tasks = localStorage.getItem('tasks');

		if (tasks) {
			tasks = JSON.parse(tasks);
			const id = task.id;
			if (id !== undefined) tasks = tasks.filter(item => item.id !== +id);
		} else {
			tasks = [];
		}

		tasks.push(task);

		try {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		} catch (e) {
			if (e.name === 'QUOTA_EXCEEDED_ERR') {
				console.log('Превышен лимит LocalStorage');
			}
		}

		dispatch({
			type: ADD_NEW_TASK,
			payload: task,
		});

		dispatch({
			type: UPDATED_ID,
			payload: task.id,
		});
	};
}
