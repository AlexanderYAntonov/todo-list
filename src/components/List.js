import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';
import './List.css';
import Modal from 'react-modal';

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

export class List extends React.Component {
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
		this.setState({ modalIsOpen: false });
	};
	/*
	handleSpanClick = e => {
		e.preventDefault();

		const itemID = e.currentTarget.id.split('&');
		const objectId = itemID[0];
		const objectType = itemID[1];

		this.props.showDetails(objectId, objectType);
		this.openModal();
	};*/

	handleRemoveClick = event => {
		const { id } = event.currentTarget;
		this.props.removeTask(id);
	};

	renderTemplate = () => {
		const { tasks } = this.props;
		let listTemplate = null;
		if (tasks.length) {
			listTemplate = tasks.map((item, index) => {
				return (
					<div key={item.id} className="List__task">
						<p>ID:{item.id}</p>
						<p>Title:{item.title}</p>
						<p>Description:{item.description}</p>
						<p>Date:{item.date}</p>
						<p>Time:{item.time}</p>
						<p>Close date:{item.close_date}</p>
						<p>Close time:{item.close_time}</p>
						<p>Done:{item.done}</p>
						<div className="List__task-icon List__task-done" id={item.id} />
						<div className="List__task-icon List__task-edit" id={item.id} />
						<div
							className="List__task-icon List__task-remove"
							onClick={this.handleRemoveClick}
							id={item.id}
						/>
					</div>
				);
			});
		} else {
			listTemplate = <p>Here will be some tasks</p>;
		}
		return listTemplate;
	};

	render() {
		//	const { isFetching, objects, objectModal } = this.props;
		const { modalIsOpen } = this.state;

		//if (objects.length) {
		return (
			<React.Fragment>
				<div className="list">
					{/*
						{isFetching ? (	<p>Загружаем ...</p>) : ({this.renderTemplate()})	}
					*/}
					{this.renderTemplate()}
				</div>

				<Modal
					isOpen={modalIsOpen}
					ariaHideApp={false}
					style={customStyles}
					onRequestClose={this.closeModal}
				>
					<p>Modal text</p>
				</Modal>
			</React.Fragment>
		);
		/*}
		return <p>Нет данных для отображения</p>;*/
	}
}
List.propTypes = {
	tasks: PropTypes.array.isRequired,
	removeTask: PropTypes.func.isRequired,
	/*
	modalObjectId: PropTypes.string.isRequired,
	objectModal: PropTypes.object.isRequired,
	cadastrString: PropTypes.string.isRequired,
	objects: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	*/
};
