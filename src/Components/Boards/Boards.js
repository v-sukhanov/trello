import React from 'react'
import { connect } from 'react-redux'

import './Boards.scss'
import Board from './Board/Board'
import DropDownInput from '../../TemplateComponents/DropDownInput/DropDownInput'




const Boards = ({boards, createBoard, deleteBoard}) => {

	// console.log(2)


	return (
		<div className="boards" data-aos="fade" data-aos-duration="500">
			
			{Array.isArray(boards) && boards.map((el, index) => (
				<Board board={el} key={index} deleteBoard={deleteBoard}/>
			))}
			<DropDownInput
					className="lists-of-board__item"
					placeholderText={{primary: 'Add a board', secondary: 'Enter a board title...'}}
					buttonText="Add Board"
					someDispatch={createBoard}
			/>
		</div>
	)
}

export default connect(
	state => ({
		boards: state.boards
	}),
	dispatch => ({
	  createBoard: (name) => {
		dispatch({type: 'CREATE_BOARD', payload: name})
	  },
	  deleteBoard: (boardId) => {
		dispatch({type: 'DELETE_BOARD', payload: {boardId}})
		dispatch({type: 'DELETE_LIST_OF_BOARD', payload: {boardId}})
	  }
	})
)(Boards)