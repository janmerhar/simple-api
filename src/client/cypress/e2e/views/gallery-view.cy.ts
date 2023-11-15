describe('GalleryView', () => {
  describe('When the user visits the gallery page', () => {
    beforeEach(() => {
      cy.visit('/gallery')
    })

    it('displays the gallery page in url', () => {
      cy.url().should('include', '/gallery/1')
    })

    it('displays the gallery card', () => {
      cy.get('.row>.flexbox').parent().should('exist')
    })

    it('it should not display previous button', () => {
      cy.get('button>svg.fa-angle-left').should('not.exist')
    })

    it('displays next button', () => {
      cy.get('button>svg.fa-angle-right').parent().should('exist')
    })

    it('clicks next button', () => {
      cy.get('button>svg.fa-angle-right').parent().click()
      cy.url().should('include', '/gallery/2')
    })
  })

  describe('When the user visits in the middle of gallery page', () => {
    beforeEach(() => {
      cy.visit('/gallery/2')
    })

    it('displays the gallery page in url', () => {
      cy.url().should('include', '/gallery/2')
    })
    it('displays the gallery card', () => {
      cy.get('.row>.flexbox').parent().should('exist')
    })

    it('displays previous button', () => {
      cy.get('button>svg.fa-angle-left').parent().should('exist')
    })

    it('displays next button', () => {
      cy.get('button>svg.fa-angle-right').parent().should('exist')
    })

    it('clicks previous button', () => {
      cy.get('button>svg.fa-angle-left').parent().click()
      cy.url().should('include', '/gallery/1')
    })

    it('clicks next button', () => {
      cy.get('button>svg.fa-angle-right').parent().click()
      cy.url().should('include', '/gallery/3')
    })
  })

  describe('When the user visits the last page of gallery page', () => {
    beforeEach(() => {
      cy.visit('/gallery/67')
    })

    it('displays the gallery page in url', () => {
      cy.url().should('include', '/gallery/67')
    })

    it('displays previous button', () => {
      cy.get('button>svg.fa-angle-left').parent().should('exist')
    })
    it('it should not display next button', () => {
      cy.get('button>svg.fa-angle-right').should('not.exist')
    })

    it('clicks previous button', () => {
      cy.get('button>svg.fa-angle-left').parent().click()
      cy.url().should('include', '/gallery/66')
    })
  })

  describe("When the user visits the page that doesn't exist", () => {
    it('redirects to the not found page', () => {
      cy.visit('/gallery/123456789')

      cy.get('h3.text-center').contains('No breed found')
    })
  })
})
