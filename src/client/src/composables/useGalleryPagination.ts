import { Breed } from '@/entities/Breed'
import type { AxiosInstance } from 'axios'
import { ref } from 'vue'

export const useGalleryPagination = ($http: AxiosInstance, initialPage: number = 1) => {
  // Page number of the current breed
  const page = ref<number>(initialPage)

  // breeds
  const previousBreed = ref<Breed | null>(null)
  const currentBreed = ref<Breed | null>(null)
  const nextBreed = ref<Breed | null>(null)

  // Fetches a page of breeds (single breed),
  // adjusts the page number to prevent obi-wan erorrs
  const fetchPage = async (page: number): Promise<Breed | null> => {
    try {
      const response = await Breed.fetchAll($http, page - 1, 1)

      return response?.length > 0 ? response[0] : null
    } catch (error) {
      return null
    }
  }

  // Fetches a pages previous to the current one
  const fetchPreviousBreed = async (): Promise<Breed | null> => {
    if (page.value > 1) {
      const response = await fetchPage(page.value - 1)

      return response
    }
    return null
  }

  // Fetches the current page
  const fetchCurrentBreed = async (): Promise<Breed | null> => {
    if (page.value > 0) {
      const response = await fetchPage(page.value)

      return response
    }

    return null
  }

  // Fetches a pages next to the current one
  const fetchNextPage = async (): Promise<Breed | null> => {
    if (page.value >= 0) {
      const response = await fetchPage(page.value + 1)

      return response
    }

    return null
  }

  // go to
  // goPreviousBreed()
  const goNextBreed = async () => {
    // Checking if we are at the end of the list
    if (!nextBreed.value) {
      return
    }

    // Sliding already fetched breeds
    page.value += 1
    previousBreed.value = currentBreed.value
    currentBreed.value = nextBreed.value

    // Fetching next breed
    nextBreed.value = await fetchNextPage()
  }

  const goPreviousBreed = async () => {
    // Checking if we are at the beginning of the list
    if (!previousBreed.value) {
      return
    }

    // Sliding already fetched breeds
    page.value -= 1
    nextBreed.value = currentBreed.value
    currentBreed.value = previousBreed.value

    // Fetching previous breed
    previousBreed.value = await fetchPreviousBreed()
  }

  const setupComposable = async () => {
    // Fetching breeds
    previousBreed.value = await fetchPreviousBreed()
    currentBreed.value = await fetchCurrentBreed()
    nextBreed.value = await fetchNextPage()
  }

  return {
    // Data for pagination
    page,
    // Breed data
    previousBreed,
    currentBreed,
    nextBreed,
    // Query functions
    goPreviousBreed,
    goNextBreed,
    // Setup function
    setupComposable
  }
}
