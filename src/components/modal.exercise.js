/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {Dialog} from './lib'
import {CircleButton} from './lib'
import VisuallyHidden from '@reach/visually-hidden'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))
// const callAll =
//   (...fns) =>
//   (...args) =>
//     console.log(fns, args)
const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

const circleDismissButton = (
  <div css={{display: 'flex', justifyContent: 'flex-end'}}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

function ModalContents(props) {
  return (
    <>
      <ModalContentsBase {...props}>
        {circleDismissButton}
        <h3 css={{textAlign: 'center', fontSize: '2em'}}>{props.title}</h3>
        {props.children}
      </ModalContentsBase>
    </>
  )
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
