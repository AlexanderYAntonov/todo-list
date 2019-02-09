import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddNew } from '../components/AddNew';
import { handleAdd, cancelEditing } from '../actions/AddNewActions';

class AddNewContainer extends Component {
	render() {
		const { addNew, handleAdd, cancelEditing } = this.props;
		return (
			<AddNew
				handleAdd={handleAdd}
				lastID={addNew.lastID}
				currentID={addNew.currentID}
				isEditing={addNew.isEditing}
				cancelEditing={cancelEditing}
			/>
		);
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
		cancelEditing: () => dispatch(cancelEditing()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNewContainer);
