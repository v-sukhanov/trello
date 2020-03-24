import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './ListsOfBoard.scss'
import DropDownInput from '../../TemplateComponents/DropDownInput/DropDownInput'
import List from './List/List'




const ListsOfBoard = ({ changeListTitle, deleteList, boardId, lists, createListClosure, createCardClosure, cardDoneClosure, cardNotDoneClosure, swapCard, addCardToAnotherList }) => {
	const createList = createListClosure(boardId)

	

	return (
		<div className="lists-of-board">
				{!boardId && <Redirect to="/"/>}
				
					{lists && lists.map((el, index) => (
						<List
							index={el.id}
							listTitle={el.title}
							listId={el.id}
							cards={el.cards}
							key={el.id}
							createCard={createCardClosure(el.id)}
							cardDone={cardDoneClosure(el.id)}
							cardNotDone={cardNotDoneClosure(el.id)}
							deleteList={deleteList}
							changeListTitle={changeListTitle}
						/>
					))}
				
				<DropDownInput
					className="lists-of-board__item"
					placeholderText={{primary: 'Add a list', secondary: 'Enter a list title...'}}
					buttonText="Add List"
					someDispatch={createList}
				/>
			
		</div>
	)
}






const mapStateToProps = state => {
	const path = state.routing.locationBeforeTransitions.pathname.match(/^\/(.*?)\/(.*)/)
	if (!path)
		return {lists: [], boardId: null}
	const board = state.boards.find((el) =>{
		if ((el.id === path[1]) && (el.title === path[2]))
			return true
		return false
	})
	if (!board) {
		return {lists: [], boardId: null}
	}
	return {
		lists: state.lists.filter((el) => el.boardId === board.id),
		boardId: board.id
	}
}

const mapDispatchToProps = dispatch => ({
	changeListTitle: (listId, listTitle) => dispatch({type: 'CHANGE_LIST_TITLE', payload: {listId, listTitle}}),
	deleteList: listId => dispatch({type: 'DELETE_LIST', payload: {listId}}),
	createListClosure: boardId => titleList => dispatch({ type: 'CREATE_LIST', payload: {boardId, titleList} }),
	createCardClosure: listId => titleCard => dispatch({ type: 'CREATE_CARD', payload: {listId, titleCard} }),
	cardDoneClosure: listId => cardId => dispatch({ type: 'CARD_DONE', payload: { cardId, listId } }),
	cardNotDoneClosure: listId => cardId => dispatch({ type: 'CARD_NOT_DONE', payload: { cardId, listId } })
	

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListsOfBoard)