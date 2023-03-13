// 🐨 you'll want a fake user to register as:
import {buildUser} from '../support/generate'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    // 🐨 create a fake user
    const user = buildUser()
    cy.visit('/')
    cy.findByRole('button', {name: /register/i}).click()
    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', {name: /username/i}).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /register/i}).click()
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /discover/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('searchbox', {name: /search/i}).type(
        'Harry Potter and the Chamber of Secrets{enter}',
      )
      cy.findByRole('listitem', {
        name: /Harry Potter and the Chamber of Secrets/i,
      }).within(() => cy.findByRole('button', {name: /add to list/i}).click())
    })
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /reading list/i}).click()
    })
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('link', {
        name: /harry potter and the chamber of secrets/i,
      }).click()
    })
    cy.findByRole('textbox', {name: /notes/i}).type('This is my custom note')
    cy.findByLabelText(/loading/i).should('exist')
    cy.findByLabelText(/loading/i).should('not.exist')

    cy.findByRole('button', {name: /mark as read/i}).click()
    cy.findByRole('radio', {name: /5 stars/i}).click({force: true})

    cy.findByRole('navigation').within(() =>
      cy.findByRole('link', {name: /finished books/i}).click(),
    )
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      cy.findByRole('link', {
        name: /harry potter and the chamber of secrets/i,
      }).click()
    })
    cy.findByRole('button', {name: /remove from list/i}).click()
    cy.findByRole('textbox', {name: /notes/i}).should('not.exist')
    cy.findByRole('radio', {name: /5 stars/i}).should('not.exist')
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })
    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 0)
    })
    //
    // 🐨 remove the book from the list
    // 🐨 ensure the notes textbox and the rating radio buttons are gone
    // 🐨 navigate back to the finished books page
    //
    // 🐨 ensure there are no books in the list
  })
})
