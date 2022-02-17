import { server } from './src/mocks/server'
import { resetTodos } from './src/mocks/data'
import { screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { todoApp } from './src/components/todos'

beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
beforeEach(() => {
  resetTodos()
  todoApp()
})
afterEach(() => {
  server.resetHandlers()
  document.body.innerHTML = ''
})

test('[1] todos are present', async () => {
  expect(await screen.findByText(/laundry/)).toBeInTheDocument()
  expect(await screen.findByText(/dishes/)).toBeInTheDocument()
  expect(await screen.findByText(/groceries/)).toBeInTheDocument()
}, 750)

test('[2] can do laundry', async () => {
  expect(await screen.findByText('laundry pending')).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('complete')[0])
  await waitForElementToBeRemoved(() => screen.queryByText('laundry pending'))
  expect(await screen.findByText('laundry DONE')).toBeInTheDocument()
  expect(await screen.findByText('not')).toBeInTheDocument()
}, 750)

test('[3] can undo laundry', async () => {
  await screen.findByText('laundry pending')
  fireEvent.click(screen.getAllByText('complete')[0])
  const button = await screen.findByText('not')
  fireEvent.click(button)
  expect(await screen.findByText('laundry pending')).toBeInTheDocument()
}, 750)
