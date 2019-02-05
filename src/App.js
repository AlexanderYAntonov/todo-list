import React, { Component } from 'react';
import './App.css';

import ListContainer from './containers/ListContainer';
import AddNewContainer from './containers/AddNewContainer';

class App extends Component {
	render() {
		return (
			<div className="App">
				<AddNewContainer />
				<ListContainer />
			</div>
		);
	}
}

export default App;
