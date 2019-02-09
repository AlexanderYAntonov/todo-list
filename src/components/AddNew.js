import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Add } from './Add';
import './AddNew.css';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '10px',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
};

export class AddNew extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
		};
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.props.cancelEditing();
		this.setState({ modalIsOpen: false });
	};

	//handle button click
	handleAddNew = task => {
		//this.closeModal();
		this.props.handleAdd(task);
		this.setState({ modalIsOpen: false });
	};

	render() {
		const { modalIsOpen } = this.state;
		const { lastID, currentID, isEditing } = this.props;

		return (
			<React.Fragment>
				<div className="AddNew-icon" onClick={this.openModal} />
				<Modal
					isOpen={modalIsOpen || isEditing}
					ariaHideApp={false}
					style={customStyles}
					onRequestClose={this.closeModal}
				>
					<Add
						onClickClose={this.closeModal}
						onClickAdd={this.handleAddNew}
						lastID={lastID}
						currentID={currentID}
					/>
				</Modal>
			</React.Fragment>
		);
	}
}

AddNew.propTypes = {
	handleAdd: PropTypes.func.isRequired,
	cancelEditing: PropTypes.func.isRequired,
	lastID: PropTypes.number.isRequired,
	currentID: PropTypes.number.isRequired,
	isEditing: PropTypes.bool.isRequired,
};
