import { describe } from 'yargs'
import { startLogin, register } from '../../src/actions/loginActions'
import { history } from '../components/routes/AppRouter'

jest.mock('axios')

// jest.mock('react-router-dom', () => {
//   const fakeHistory = {
//     push: jest.fn()
//   }

//   return {
//     ...jest.requireActual('react-router-dom'),
//     history: () => fakeHistory
//   }
// })

// describe('Login', () => {
//     test('redirects to /home', async () => {
//         const pushSpy = jest.spyOn(history, 'push')
//     })
// })