import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import {generate} from 'rand-token'

const initialStateBoards = () => {
	const board = window.localStorage.getItem('boards')
	
	if (board) {
		return JSON.parse(board)
	} else {
		return []
	}
}

const initialStateLists = () => {
	const lists = window.localStorage.getItem('lists')
	if (lists) {
		return JSON.parse(lists)
	} else {
		return []
	}
}




export default combineReducers({
	routing: routerReducer,
	boards: (state = initialStateBoards(), action) => {
		let newState = state
		switch (action.type) {
			case 'CREATE_BOARD':
				newState = [...state, { id: generate(8), title: action.payload, lists: [] }]
				break
			case 'DELETE_BOARD':
				newState = newState.filter((el) => el.id !== action.payload.boardId)
				break
			default:
				break
		}
		if (state !== newState) {
			window.localStorage.setItem('boards', JSON.stringify(newState))
		}
		return newState
	},
	lists: (state = initialStateLists(), action) => {
		let newState = state
		switch (action.type) {
			case 'CHANGE_LIST_TITLE':
				newState = newState.map((el) => el.id === action.payload.listId ? {...el, title: action.payload.listTitle} : el)
				break
			case 'CREATE_LIST':
				newState = [...state, {id: generate(8), title: action.payload.titleList, boardId: action.payload.boardId, cards: []}]
				break
			case 'DELETE_LIST':
				newState = newState.filter((el) => el.id !== action.payload.listId)
				break
			case 'DELETE_LIST_OF_BOARD':
				newState = newState.filter(el => el.boardId !== action.payload.boardId)
				break
			case 'CREATE_CARD':
				newState = newState.map((el) => {
					if (el.id === action.payload.listId) {
						return {...el, cards: [...el.cards, {id: Date.now(), title: action.payload.titleCard, done: false}]}
					}
					return el
				})
				break
			case 'CARD_DONE':
				newState = newState.map((el) => {
					if (el.id === action.payload.listId) {
						return {...el, cards: el.cards.map(ell => ell.id === action.payload.cardId ? {...ell, done: true} : ell)}
					}
					return el
				})
				break
			case 'CARD_NOT_DONE':
				newState = newState.map((el) => {
					if (el.id === action.payload.listId) {
						return {...el, cards: el.cards.map(el => el.id === action.payload.cardId ? {...el, done: false} : el)}
					}
					return el
				})
				break
			case 'SWAP_CARD':
				newState = newState.map((el) => {
					console.log(action.payload.listId)
					console.log("lists: -> el.id", el.id)

					if (el.id === action.payload.listId) {
						const newCards = [...el.cards]
						newCards.splice(action.payload.destinationIndex, 0, newCards[action.payload.sourceIndex])
						newCards.splice(action.payload.sourceIndex + 1, 1)
						return {...el, cards: newCards}
					}
					return el
				})

				break
			case 'ADD_CARD_TO_ANOTHER_LIST':
				let cardTraveler = null
				newState = newState.map((el) => {
					if (el.id === action.payload.sourceList) {
						const newCards = [...el.cards]
						cardTraveler = newCards.splice(action.payload.sourceIndex, 1)[0]
						
						return {...el, cards: newCards}
					}
					return el
				})
				newState = newState.map((el) => {
					if (el.id === action.payload.destinationList) {
						const newCards = [...el.cards]
						cardTraveler = newCards.splice(action.payload.destinationIndex, 0, cardTraveler)
						return {...el, cards: newCards}
					}
					return el
				})
				break
			default:
				break
		}
		if (state !== newState) {
			window.localStorage.setItem('lists', JSON.stringify(newState))
		}
		return newState
	}
})