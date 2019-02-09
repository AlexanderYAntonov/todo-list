import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';
import './List.css';

export class List extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			priority: 'All',
		};
	}

	handleRemoveClick = event => {
		const { id } = event.currentTarget;
		this.props.removeTask(id);
	};

	handleDoneClick = event => {
		const { id } = event.currentTarget;
		this.props.completeTask(id);
	};

	handleEditClick = event => {
		const { id } = event.currentTarget;
		this.props.editTask(id);
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

	setPriority = event => {
		const { value } = event.target;
		this.setState({ priority: value });
	};

	renderSelectors = () => {
		const { priority } = this.state;

		return (
			<div
				onChange={event => this.setPriority(event)}
				className="List__form-radio"
			>
				<label
					className={
						(priority === 'All' && 'List-checked_radio') ||
						'List-no_checked_radio'
					}
				>
					Все
					<input type="radio" name="priority" value="All" defaultChecked />
				</label>
				<label
					className={
						(priority === 'Normal' && 'List-checked_radio') ||
						'List-no_checked_radio'
					}
				>
					Обычная
					<input type="radio" name="priority" value="Normal" />
				</label>
				<label
					className={
						(priority === 'Important' && 'List-checked_radio') ||
						'List-no_checked_radio'
					}
				>
					Важная
					<input type="radio" name="priority" value="Important" />
				</label>

				<label
					className={
						(priority === 'Very important' && 'List-checked_radio') ||
						'List-no_checked_radio'
					}
				>
					Очень важная
					<input type="radio" name="priority" value="Very important" />
				</label>
			</div>
		);
	};

	renderTemplate = () => {
		let { tasks } = this.props;
		const { priority } = this.state;
		const priorities = {
			Normal: 'Обычная',
			Important: 'Важная',
			'Very important': 'Очень важная',
		};

		//filter tasks according to priority
		if (priority !== 'All') {
			tasks = tasks.filter(item => item.priority === priority);
		}

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
						<p className="List__task-title">Название: {item.title}</p>
						<p className="List__task-description">
							Описание: {item.description}
						</p>
						<p>Важность: {priorities[item.priority]}</p>

						{item.date ? (
							<p>
								Срок: {item.date} {item.time}
							</p>
						) : (
							<React.Fragment />
						)}
						{item.done ? (
							<React.Fragment>
								<p>Дата выполнения: {item.close_date}</p>
								<p>Время выполнения: {item.close_time}</p>
							</React.Fragment>
						) : (
							<React.Fragment />
						)}
						<div
							className="List__task-icon List__task-done"
							onClick={this.handleDoneClick}
							id={item.id}
						/>
						{!item.done && (
							<div
								className="List__task-icon List__task-edit"
								onClick={this.handleEditClick}
								id={item.id}
							/>
						)}
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
		const { isFetching } = this.props;

		return (
			<div className="List__selsAndList">
				{this.renderSelectors()}

				<div className="list">
					{isFetching ? <p>Загружаем ...</p> : this.renderTemplate()}
				</div>
			</div>
		);
	}
}
List.propTypes = {
	tasks: PropTypes.array.isRequired,
	removeTask: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	editTask: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
