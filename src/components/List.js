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

	handleDoneClick = event => {
		const { id } = event.currentTarget;
		this.props.completeTask(id);
	};

	//check if task is late
	checkDateIsLate(date, time) {
		if (!date) {
			return false;
		}
		if (time === '') {
			time = '23-59';
		}

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

		//get str for compare
		const str =
			datetime.getFullYear() +
			'.' +
			values[1] +
			'.' +
			values[0] +
			'.' +
			values[2] +
			'.' +
			values[3];

		//format task date & time for compare
		const strTask = date.split('-').join('.') + '.' + time.split('-').join('.');

		if (strTask < str) {
			return true;
		} else {
			return false;
		}
	}

	renderTemplate = () => {
		const { tasks } = this.props;
		let listTemplate = null;
		if (tasks.length) {
			listTemplate = tasks.map((item, index) => {
				let classStr = 'List__task';
				if (item.done) {
					classStr += ' List__task-completed';
				}
				if (this.checkDateIsLate(item.date, item.time) && !item.done) {
					classStr += ' List__task-late';
				}

				return (
					<div key={item.id} className={classStr}>
						<p>Название:{item.title}</p>
						<p>Описание:{item.description}</p>

						{item.date ? (
							<p>
								Срок:{item.date} {item.time}
							</p>
						) : (
							<React.Fragment />
						)}
						{item.done ? (
							<React.Fragment>
								<p>Дата выполнения:{item.close_date}</p>
								<p>Время выполнения:{item.close_time}</p>
							</React.Fragment>
						) : (
							<React.Fragment />
						)}
						<div
							className="List__task-icon List__task-done"
							onClick={this.handleDoneClick}
							id={item.id}
						/>
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
			listTemplate = <p>Пока задач нет</p>;
		}
		return listTemplate;
	};

	render() {
		//	const { isFetching, objects, objectModal } = this.props;
		const { modalIsOpen } = this.state;
		const { isFetching } = this.props;

		return (
			<React.Fragment>
				<div className="list">
					{isFetching ? <p>Загружаем ...</p> : this.renderTemplate()}
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
	}
}
List.propTypes = {
	tasks: PropTypes.array.isRequired,
	removeTask: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
