import React from 'react';
import PropTypes from 'prop-types';
import './Add.css';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			date: '',
			time: '',
			priority: 'Normal',
			titleStatus: true,
			descriptionStatus: true,
			dateStatus: true,
			timeStatus: true,
			id: 0,
		};
	}

	componentDidMount() {
		/*const currentDatetime = new Date();
		const currentDate = currentDatetime.toLocaleDateString();
		const currentTime = currentDatetime.toLocaleTimeString();
		this.setState({ datetime: currentDate + 'T' + currentTime });*/
	}

	addData = () => {
		//validate data & call action');
		let error = 0;
		let { title, description, date, time, priority } = this.state;
		const { currentID, lastID } = this.props;

		title = title.trim();
		description = description.trim();

		if (!title) {
			this.setState({ titleStatus: false });
			error += 1;
		} else {
			this.setState({ titleStatus: true });
		}

		if (!description) {
			this.setState({ descriptionStatus: false });
			error += 2;
		} else {
			this.setState({ descriptionStatus: true });
		}

		if (error > 0) return false;

		let id = 0;

		if (currentID === 0) {
			id = lastID + 1;
		} else {
			id = currentID;
		}
		//now call action
		console.log(
			'id, Tile, desc, date,time, priority = ',
			id,
			title,
			description,
			date,
			time,
			priority
		);
		this.props.onClickAdd({
			title: title,
			description: description,
			date: date,
			time: time,
			priority: priority,
			id: id,
		});
	};

	/*validate = (event) => {
        let {imageTitle, imageURL} = this.state;
        imageTitle = imageTitle.trim();
        imageURL = imageURL.trim();
        
        return imageTitle && imageURL;
    }*/

	handleChange = event => {
		const { id, value } = event.currentTarget;

		this.setState({ [id]: value });
		//console.log(this.state);
	};

	setPriority = event => {
		const { value } = event.target;
		console.log('Set priority to', value, event.target.value);
		this.setState({ priority: value });
	};

	render() {
		const {
			title,
			description,
			date,
			time,
			priority,
			dateStatus,
			timeStatus,
			titleStatus,
			descriptionStatus,
		} = this.state;
		return (
			<form className="add__form">
				<span className="add__header">Добавить задачу</span>

				<div
					onChange={event => this.setPriority(event)}
					className="add__form-radio"
				>
					<label
						className={
							(priority === 'Normal' && 'checked_radio') || 'no_checked_radio'
						}
					>
						Обычная
						<input type="radio" name="priority" value="Normal" defaultChecked />
					</label>
					<label
						className={
							(priority === 'Important' && 'checked_radio') ||
							'no_checked_radio'
						}
					>
						Важная
						<input type="radio" name="priority" value="Important" />
					</label>

					<label
						className={
							(priority === 'Very important' && 'checked_radio') ||
							'no_checked_radio'
						}
					>
						Очень важная
						<input type="radio" name="priority" value="Very important" />
					</label>
				</div>

				<input
					type="text"
					id="title"
					className={
						(titleStatus && 'add__field') ||
						(!titleStatus && 'add__field_error')
					}
					value={title}
					onChange={this.handleChange}
					autoFocus={true}
					placeholder="Название"
				/>
				<textarea
					id="description"
					className={
						(descriptionStatus && 'add__field add__textarea') ||
						(!descriptionStatus && 'add__field_error add__textarea')
					}
					value={description}
					onChange={this.handleChange}
					placeholder="Описание"
				/>
				<input
					type="date"
					id="date"
					className={
						(dateStatus && 'add__field') || (!dateStatus && 'add__field_error')
					}
					value={date}
					onChange={this.handleChange}
					placeholder="Дата"
				/>
				<input
					type="time"
					id="time"
					className={
						(timeStatus && 'add__field') || (!timeStatus && 'add__field_error')
					}
					value={time}
					onChange={this.handleChange}
					placeholder="Время"
				/>

				<div className="add__buttons">
					<div className="add__close_btn" onClick={this.props.onClickClose}>
						Отмена
					</div>
					<div className="add__add_btn" onClick={this.addData}>
						ОК
					</div>
				</div>
			</form>
		);
	}
}

Add.propTypes = {
	onClickClose: PropTypes.func.isRequired,
	onClickAdd: PropTypes.func.isRequired,
	lastID: PropTypes.number.isRequired,
	currentID: PropTypes.number.isRequired,
};

export { Add };
