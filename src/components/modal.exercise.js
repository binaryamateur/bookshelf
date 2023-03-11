// 🐨 you're going to need the Dialog component
// It's just a light wrapper around ReachUI Dialog
// 📜 https://reacttraining.com/reach-ui/dialog/
import React from 'react'
import {Dialog} from './lib'

// 💰 Here's a reminder of how your components will be used:
/*
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>
*/

// we need this set of compound components to be structurally flexible
// meaning we don't have control over the structure of the components. But
// we still want to have implicitly shared state, so...
// 🐨 create a ModalContext here with React.createContext
const ModalContext = React.createContext()
const Modal = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

const ModalDismissButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: () => {
      setIsOpen(false)
    },
  })
}

const ModalOpenButton = ({children: child}) => {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: () => {
      setIsOpen(true)
    },
  })
}

const ModalContents = props => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

export {ModalContents, ModalOpenButton, ModalDismissButton, Modal}
