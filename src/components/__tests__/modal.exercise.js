// 🐨 you're gonna need this stuff:
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
test('can be opened and closed', async () => {
  const label = 'Modal Label'
  const title = 'Modal Title'
  const content = 'Modal Content'
  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <div>{content}</div>
      </ModalContents>
    </Modal>,
  )
  await userEvent.click(screen.getByRole('button', {name: /open/i}))
  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', label)
  const inModal = within(modal)
  expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
  expect(inModal.getByText(content)).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', {name: /close/i}))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  //   screen.debug()
})
