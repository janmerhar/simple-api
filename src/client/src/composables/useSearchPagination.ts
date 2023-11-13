import { Breed } from '@/entities/Breed'
import type { AxiosInstance } from 'axios'
import { computed, ref } from 'vue'

export const useSearchPagination = ($http: AxiosInstance, initialPage: number = 1) => {
  const size = ref<number>(9) // size of a fetched page
  const numberOfPages = ref<number>(0) // number of all breads
  const page = ref<number>(initialPage) // current page
  const query = ref<string>('')

  const breeds = ref<Breed[]>([])

  // Tells whether the current page is a search page
  const isSearch = computed((): boolean => query.value.length > 0)

  // Fetches a page of breeds,
  // adjusts the page number to prevent obi-wan erorrs
  const fetchPage = async (page: number): Promise<Breed[]> => {
    const response = await Breed.fetchAll($http, page - 1, size.value)

    return response
  }

  const fetchPageNumber = async (pageNumber: number) => {
    // Reset search query
    query.value = ''

    try {
      if (pageNumber > 0 && pageNumber <= numberOfPages.value) {
        breeds.value = await fetchPage(pageNumber)
        page.value = pageNumber
      }
    } catch (error) {
      return
    }
  }

  const fetchQuery = async (searchQuery: string = '') => {
    try {
      // Fetching first page if the method is not search
      if (searchQuery.length === 0) {
        fetchPageNumber(1)
      } else {
        breeds.value = await Breed.find($http, searchQuery)
        query.value = searchQuery
        page.value = 0
      }
    } catch (error) {
      return
    }
  }

  // 1. Fetches the number of all breeds
  // 2. Calculates the number of pages
  // 3. Fetches the first page
  const setupComposable = async () => {
    try {
      const totalBreeds = await Breed.numberOfBreeds($http)
      numberOfPages.value = Math.ceil(totalBreeds / size.value)
      await fetchPageNumber(page.value)
    } catch (error) {
      breeds.value = []
    }
  }

  return {
    // Fetched breeds
    breeds,
    // Data for pagination
    page,
    numberOfPages,
    // Query function
    fetchPageNumber,
    fetchQuery,
    // Tells whether the current page is a search page
    isSearch,
    // Setup function
    setupComposable
  }
}
