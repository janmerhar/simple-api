export const CreatePaginationComponentPropsStub = (pages: number, currentPage: number) => {
  return {
    props: {
      pages,
      currentPage
    },
    // fixing the issue with font-awesome-icons
    global: {
      stubs: {
        'font-awesome-icon': {
          template: '<i />'
        }
      }
    }
  }
}
