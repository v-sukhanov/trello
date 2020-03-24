import React, { useEffect } from 'react'
import Icon from '@material-ui/core/Icon'
import './List.scss'
import DropDownInput from '../../../TemplateComponents/DropDownInput/DropDownInput'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Card = ({card, ClickHandlerCard, index}) => {
	return (
		<Draggable draggableId={`${card.id}`} index={index} key={card.id}>
			{(provided, snapshot) => {
				return (
					<div
						
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{...provided.draggableProps.style}}
						className={"list__card" + (card.done ? " list__card_done": "")} >
						<span>{card.title}</span>
						<Icon className="list__close" data-cardid={card.id} data-done={card.done} onClick={ClickHandlerCard}>done</Icon>
					</div>
				)
			}}
		</Draggable>
		
	)
}

const List = ({ changeListTitle, deleteList, listId, listTitle, cards, createCard, cardDone, cardNotDone, index }) => {

	const clickHandlerCard = (e) => {
		if (e.currentTarget.dataset.done === 'true') {
			cardNotDone(Number(e.currentTarget.dataset.cardid))
		} else {
			cardDone(Number(e.currentTarget.dataset.cardid))
		}
	}

	const clickHandlerDelete = (e) => {
		deleteList(listId)
	}

	const focusInput = (e) => {
		e.currentTarget.value = listTitle
		e.currentTarget.placeholder = ''
		e.currentTarget.select()
	}
	const blurInput = (e) => {
		e.currentTarget.value = ''
		e.currentTarget.placeholder = listTitle
	}

	const keyDownEnter = (e) => {
		if (e.keyCode === 13) {
			changeListTitle(listId, e.currentTarget.value)
			e.currentTarget.blur()
		}
	}


	return (
		
		<div className="list"  key={index}>

			<div className="list__title">
				{/* {listTitle} */}
				<input type="text" className="list__title-input" placeholder={listTitle} onBlur={blurInput} onFocus={focusInput} onKeyDown={keyDownEnter}/>
				<Icon className="list__delete" onClick={clickHandlerDelete} >highlight_off</Icon>
			</div>
			<Droppable droppableId={`${index}`}>
				{(provided, snapshot) => {
					return (
						<div  {...provided.droppableProps} ref={provided.innerRef}>
							{cards.map((el, index) => <Card key={el.id} index={index} card={el} ClickHandlerCard={clickHandlerCard}/>)}
							{provided.placeholder}

						</div>
					)
					
				}}
			</Droppable>

			
			<DropDownInput
				className="list__item"
				placeholderText={{primary: 'Add a card', secondary: 'Enter a title for this card...'}}
				buttonText="Add Card"
				someDispatch={createCard}
			/>
		</div>
			
		
		
	)
}

export default List