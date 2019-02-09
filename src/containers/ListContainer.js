import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
import {
	getTasksFromStorage,
	removeTask,
	completeTask,
} from '../actions/ListActions';

class ListContainer extends Component {
	componentDidMount() {
		this.props.getTasksFromStorage();
	}

	render() {
		const { list, removeTask, completeTask } = this.props;

		let tasks = list.tasks;
		if (!tasks) {
			tasks = [];
		}

		return (
			<List
				tasks={tasks}
				removeTask={removeTask}
				completeTask={completeTask}
				isFetching={list.isFetching}
			/>
		);
	}
}
const mapStateToProps = store => {
	return {
		list: store.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getTasksFromStorage: (objectId, objectType) =>
			dispatch(getTasksFromStorage(objectId, objectType)),
		removeTask: (objectId, objectType) =>
			dispatch(removeTask(objectId, objectType)),
		completeTask: (objectId, objectType) =>
			dispatch(completeTask(objectId, objectType)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListContainer);
