describe('Search bar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the search bar', () => {
    cy.get('input').should('have.value', '')
    cy.contains('button', 'Search')
  })

  it('searches for a non existing term', () => {
    cy.get('input').type('test')
    cy.contains('button', 'Search').click()

    cy.url().should('include', '/')
    cy.contains('h3', 'No breeds found')
  })

  it('searches for an existing term', () => {
    cy.get('input').type('coon')

    cy.contains('button', 'Search').click()

    cy.contains('.title-spacing', 'Maine Coon')
  })
})
