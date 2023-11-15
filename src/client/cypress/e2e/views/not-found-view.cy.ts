describe('Not Found Page', () => {
  beforeEach(() => {
    cy.visit('/galleryys/not-found')
  })

  it('should display the not found page', () => {
    cy.get('p.text-large').contains('404')
    cy.get('h3.text-uppercase').contains('Page Not Found')
  })
})
