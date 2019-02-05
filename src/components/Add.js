import React from 'react';
import PropTypes from 'prop-types';
import './Add.css';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			datetime: '',
			priority: 'Normal',
			titleStatus: true,
			descriptionStatus: true,
			datetimeStatus: true,
			//	timeStatus: true,
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
		let { title, description, datetime, priority } = this.state;
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

		//now call action
		console.log(
			'Tile, desc, datetime, priority = ',
			title,
			description,
			datetime,
			priority
		);
		this.props.onClickAdd({
			title: title,
			description: description,
			date: datetime,
			priority: priority,
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
			datetime,
			priority,
			datetimeStatus,
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
					type="datetime-local"
					id="datetime"
					className={
						(datetimeStatus && 'add__field') ||
						(!datetimeStatus && 'add__field_error')
					}
					value={datetime}
					onChange={this.handleChange}
					placeholder="Дата и время"
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
};

export { Add };
