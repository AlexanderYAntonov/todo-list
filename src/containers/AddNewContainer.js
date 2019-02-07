import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddNew } from '../components/AddNew';
import { handleAdd } from '../actions/AddNewActions';

class AddNewContainer extends Component {
	render() {
		const { addNew, handleAdd } = this.props;
		return <AddNew handleAdd={handleAdd} lastID={addNew.lastID} />;
	}
}

const mapStateToProps = store => {
	return {
		addNew: store.addNew,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleAdd: task => dispatch(handleAdd(task)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNewContainer);
