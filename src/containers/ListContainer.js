import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
import { getTasksFromStorage, removeTask } from '../actions/ListActions';

class ListContainer extends Component {
	componentDidMount() {
		this.props.getTasksFromStorage();
	}

	render() {
		const { list, removeTask } = this.props;

		let tasks = list.tasks;
		if (!tasks) {
			tasks = [];
		}

		return <List tasks={tasks} removeTask={removeTask} />;
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListContainer);
