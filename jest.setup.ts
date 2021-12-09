import '@testing-library/jest-dom/extend-expect'
import 'axios'
import { config } from 'dotenv'
import { cleanAll, restore } from 'nock'

config({ path: '.env.local' })

afterAll(() => {
  cleanAll()
  restore()
})

// window.matchMedia = jest.fn().mockImplementation(query => {
//   return {
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//   }
// })

// window.scroll = jest.fn()
// window.alert = jest.fn()
