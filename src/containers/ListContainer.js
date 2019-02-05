import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
//import { showDetails } from '../actions/ListActions';

class ListContainer extends Component {
	render() {
		const { list /*, showDetails*/ } = this.props;

		return <List tasks={list.tasks} />;
	}
}
const mapStateToProps = store => {
	return {
		list: store.list,
	};
};
/*
const mapDispatchToProps = dispatch => {
	return {
		showDetails: (objectId, objectType) =>
			dispatch(showDetails(objectId, objectType)),
	};
};
*/
export default connect(mapStateToProps /*,
	mapDispatchToProps*/)(ListContainer);
