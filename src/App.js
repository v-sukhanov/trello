import React from 'react';
import './App.scss';
import Boards from './Components/Boards/Boards';

import { Switch, Route, Link } from 'react-router-dom'
import ListsOfBoard from './Components/ListsOfBoard/ListsOfBoard';


function App() {
	

	return (
		<div className="conteiner" >
			<Link to="/">
				<div className="conteiner__back-to-board">
					<button className="conteiner__button-back">
						To boards
					</button>
				</div>
			</Link>
				<Switch>
					<Route path="/:id" >
						
						<ListsOfBoard/>
					</Route>
					<Route path="/" >

						<Boards/>
					</Route>
				</Switch>

		</div>
	)
}

export default App;
