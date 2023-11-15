describe('Breed Card', () => {
  beforeEach(() => {
    cy.fixture('search-card.json').then((searchCardJSON) => {
      this.searchCard = searchCardJSON
    })
  })

  describe('card', () => {
    // Always displaying a single card
    beforeEach(() => {
      cy.visit('/')

      cy.get('input').type(this.searchCard.searchTerm)
      cy.contains('button', 'Search').click()
    })

    it('should render breed card', () => {
      cy.get('.card').should('exist')
    })

    it('should render the breed card with the correct image and description', () => {
      cy.contains('.title-spacing', this.searchCard.name)
      cy.get('img').should('exist')

      cy.get('img').invoke('attr', 'src').should('exist')
      cy.get('img').invoke('attr', 'src').should('include', this.searchCard.reference_image_id)
      cy.get('img')
        .invoke('attr', 'src')
        .then((src) => {
          cy.request(src as string)
            .its('status')
            .should('eq', 200)
        })
    })

    it('should expand on click on the arrow', () => {
      cy.contains('button', 'Search').click()

      cy.get('.page-link>svg').should('exist')
      cy.get('.page-link>svg').first().click()
    })

    it('should collapse on click on the arrow', () => {
      cy.contains('button', 'Search').click()

      cy.get('.page-link>svg').should('exist')
      cy.get('.page-link>svg').first().click()
      cy.get('.page-link>svg').first().click()
    })
  })

  describe('card details', () => {
    beforeEach(() => {
      cy.visit('/')

      cy.get('input').type(this.searchCard.searchTerm)
      cy.contains('button', 'Search').click()

      cy.get('.page-link>svg').should('exist')
      cy.get('.page-link>svg').first().click()
    })

    it('should display card properties', () => {
      // Expanded area exists
      cy.get('.card-body>.container-fluid').should('exist')
    })

    it('should display card lifespan and age', () => {
      cy.get('.card-body>.container-fluid>.row').should('contain', 'years')
      cy.get('.card-body>.container-fluid>.row').should('contain', this.searchCard.life_span)
      cy.get('.card-body>.container-fluid>.row').should('contain', 'kg')
      cy.get('.card-body>.container-fluid>.row').should('contain', this.searchCard.weight_metric)
    })

    it('should display card description', () => {
      cy.get('.card-body>.container-fluid>.text-justify').should(
        'contain',
        this.searchCard.description
      )
    })

    it('should display card wikipedia button', () => {
      cy.get('.card-body>.container-fluid>.btn').should('exist')

      // Wikipedia URL should be valid
      cy.get('.card-body>.container-fluid>.btn')
        .invoke('attr', 'href')
        .should('eq', this.searchCard.wikipedia_url)
      cy.get('.card-body>.container-fluid>.btn')
        .invoke('attr', 'href')
        .then((href) => {
          cy.request(href as string)
            .its('status')
            .should('eq', 200)
        })
    })
  })
})
