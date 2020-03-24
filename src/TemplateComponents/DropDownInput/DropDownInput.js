import React, { useEffect, createRef } from 'react'
import Icon from '@material-ui/core/Icon'

import './DropDownInput.scss'

const DropDownInput = ({className = '', placeholderText, buttonText, someDispatch}) => {

	const refInput = createRef()
	const clickHandler = (e) => {
		if (e.currentTarget.className !== ('DropDownInput DropDownInput_focus ' + className)) {

			e.currentTarget.className = ('DropDownInput DropDownInput_focus ' + className)
			refInput.current.placeholder = placeholderText.secondary
			refInput.current.focus()
		}
		if (e.target.dataset.name === 'close') {
			e.currentTarget.className = ('DropDownInput ' + className)
			refInput.current.value = ''
			refInput.current.placeholder = placeholderText.primary

		}
	}

	const keyDownHandler = (e) => {

		if (e.keyCode === 13) {
			if (refInput.current.value) {
				someDispatch(refInput.current.value)
				e.currentTarget.className = ('DropDownInput ' + className)
				refInput.current.value = ''
				refInput.current.placeholder = placeholderText.primary

			}
		}
		
	}

	const clickHandlerButtonWrap = (e) => {
		console.log('clickHandler')
 
		if (refInput.current.value) {

			someDispatch(refInput.current.value)
			refInput.current.value = ''
		}
		
	}

	

	return (
		<div className={"DropDownInput " + className} onClick={clickHandler} onKeyDown={keyDownHandler}>
			<div className="DropDownInput__input-wrapper" >
				<input type="text" className="DropDownInput__input" placeholder={placeholderText.primary} ref={refInput}/>
				<Icon className="DropDownInput__add" >add</Icon>
			</div>
			<div className="DropDownInput__button-wrapper"> 
				<button className="DropDownInput__button" onClick={(clickHandlerButtonWrap)} >{buttonText}</button>
				<Icon className="DropDownInput__close" data-name="close">close</Icon>
			</div>
		</div>
	)
}

export default DropDownInput