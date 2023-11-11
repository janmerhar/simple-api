import { describe, expect, vi, beforeEach, it } from 'vitest'
import { Breed } from '../Breed'

import { CreateBreedReponse } from './create-breed-response.stub'
import { CreateImageReponse } from './create-image-response.stub'
import { CreateBreedNoImageReponse } from './create-breed-no-image-response.stub'

import axios, { type AxiosResponse } from 'axios'

vi.mock('axios')

describe('Breed', () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockReset()
  })

  describe('constructor', () => {
    it('should create a new Breed instance from a BreedResponse with an image', () => {
      const breedResponse = CreateBreedReponse()
      const breed = new Breed(breedResponse)

      expect(breed.name).toEqual(breedResponse.name)
      expect(breed.country_code).toEqual(breedResponse.country_code)
      expect(breed.weight_metric).toEqual(breedResponse.weight.metric)
      expect(breed.life_span).toEqual(breedResponse.life_span)
      expect(breed.description).toEqual(breedResponse.description)
      expect(breed.wikipedia_url).toEqual(breedResponse.wikipedia_url)
      expect(breed.reference_image_id).toEqual(breedResponse.reference_image_id)
    })

    it('should create a new Breed instance from a BreedResponse without an image', () => {
      const breedResponse = CreateBreedNoImageReponse()
      const breed = new Breed(breedResponse)

      expect(breed.name).toEqual(breedResponse.name)
      expect(breed.country_code).toEqual(breedResponse.country_code)
      expect(breed.weight_metric).toEqual(breedResponse.weight.metric)
      expect(breed.life_span).toEqual(breedResponse.life_span)
      expect(breed.description).toEqual(breedResponse.description)
      expect(breed.wikipedia_url).toEqual(breedResponse.wikipedia_url)
      expect(breed.reference_image_id).toBeUndefined()
    })
  })

  describe('fetchAll', () => {
    it('should fetch a list of breeds from the API and return an array of Breed instances', async () => {
      const breedsData = Array.from({ length: 5 }, () => CreateBreedReponse())
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: breedsData })

      const breeds = await Breed.fetchAll(axios)

      expect(breeds).toHaveLength(5)

      for (let i = 0; i < breeds.length; i++) {
        expect(breeds[i]).toBeInstanceOf(Breed)

        expect(breeds[i].name).toBe(breedsData[i].name)
        expect(breeds[i].country_code).toBe(breedsData[i].country_code)
        expect(breeds[i].weight_metric).toBe(breedsData[i].weight.metric)
        expect(breeds[i].life_span).toBe(breedsData[i].life_span)
        expect(breeds[i].description).toBe(breedsData[i].description)
        expect(breeds[i].wikipedia_url).toBe(breedsData[i].wikipedia_url)
      }
    })
  })

  describe('fetchImage', () => {
    it("should fetch the breed's image from the API", async () => {
      const imageResponse = CreateImageReponse()
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: imageResponse })

      const breedResponse = CreateBreedReponse()
      const breed = new Breed(breedResponse)

      const image = await breed.fetchImage(axios)

      expect(image).toBe(imageResponse.url)
    })

    it("should not fetch the breed's image if it doesn't have one", async () => {
      const breedResponse = CreateBreedNoImageReponse()
      const breed = new Breed(breedResponse)

      // @ts-ignore
      axios.get.mockResolvedValueOnce({
        status: 400,
        data: `Couldn't find an image matching the passed 'id' of ${breed.reference_image_id}`
      } as AxiosResponse)

      const image = await breed.fetchImage(axios)

      expect(image).toBeUndefined()
    })
  })

  describe('find', () => {
    it('should fetch a breed from the API and return a Breed instance', async () => {
      const breedResponse = CreateBreedReponse()
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: [breedResponse] })

      const breeds = await Breed.find(axios, breedResponse.name)

      expect(breeds).toHaveLength(1)
      expect(breeds[0]).toBeInstanceOf(Breed)
      expect(breeds[0].name).toBe(breedResponse.name)
      expect(breeds[0].country_code).toBe(breedResponse.country_code)
      expect(breeds[0].weight_metric).toBe(breedResponse.weight.metric)
      expect(breeds[0].life_span).toBe(breedResponse.life_span)
      expect(breeds[0].description).toBe(breedResponse.description)
      expect(breeds[0].wikipedia_url).toBe(breedResponse.wikipedia_url)
      expect(breeds[0].reference_image_id).toBe(breedResponse.reference_image_id)
    })

    it("should not find a breed that doesn't exist", async () => {
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: [] })

      const breeds = await Breed.find(axios, 'foo')

      expect(breeds).toHaveLength(0)
    })
  })

  describe('numberOfBreeds', () => {
    it('should fetch the number of breeds from the API', async () => {
      const numberOfBreeds = 10
      // @ts-ignore
      axios.get.mockResolvedValueOnce({
        data: [],
        headers: { 'pagination-count': numberOfBreeds }
      })

      const count = await Breed.numberOfBreeds(axios)

      expect(count).toBe(numberOfBreeds)
    })
  })
})
