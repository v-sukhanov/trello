import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import {Router} from 'react-router-dom'

import redusers from './reducers/index'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {  createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { DragDropContext } from 'react-beautiful-dnd'

AOS.init();





const store = createStore(redusers, {routing: { locationBeforeTransitions: createBrowserHistory().location} }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const history = syncHistoryWithStore(createBrowserHistory(), store)

const swapCard = (listId, sourceIndex, destinationIndex) => store.dispatch({ type: 'SWAP_CARD', payload: {listId, sourceIndex, destinationIndex} })
const addCardToAnotherList = (sourceList, destinationList, sourceIndex, destinationIndex) => store.dispatch({ type: 'ADD_CARD_TO_ANOTHER_LIST', payload: {sourceList, destinationList, sourceIndex, destinationIndex} })

const onDragEnd = (result) => {
	const { source, destination } = result
	if (!destination)
		return
	if (source.droppableId === destination.droppableId) {
		swapCard(source.droppableId, Number(source.index), Number(destination.index))
	}
	else {
		addCardToAnotherList(source.droppableId, destination.droppableId, Number(source.index), Number(destination.index))

	}

}

ReactDOM.render(
	<Provider store={store}>
		<DragDropContext onDragEnd={onDragEnd}>
			<Router history={history}>
				<App />
			</Router>
		</DragDropContext>

	</Provider>
		,
		document.getElementById('root'));

serviceWorker.unregister();
