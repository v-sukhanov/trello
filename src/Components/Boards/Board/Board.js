import React from 'react'
import { Link } from 'react-router-dom'
import './Board.scss'
import { Icon } from '@material-ui/core'


const Board = ({ board, deleteBoard }) => {

	const clickHandlerDelete = (e) => {
		deleteBoard(board.id)
	}

	return (
		<div className="board-wrapper">
			<Icon className="board__close" onClick={clickHandlerDelete}>highlight_off</Icon>
			<Link to={`${board.id}/${board.title.replace(/\s/g, '_')}`} data-board={board.id} >
				<div className="board boards__item">
					<span className="title">
						{board.title}
					</span>

				</div>
			</Link>
		</div>
		
		
	)
}

export default Board