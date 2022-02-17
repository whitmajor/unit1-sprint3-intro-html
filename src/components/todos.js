import axios from 'axios'

export async function todoApp() {
  const getTodos = () => fetch('http://localhost:9000/api/todos')
    .then(res => res.json())
    .catch(err => console.log(JSON.stringify(err)))

  let todos
  try {
    todos = await getTodos()
  } catch (err) {
    console.log(JSON.stringify(err))
  }

  const container = document.createElement('div')
  const heading = document.createElement('h1')
  const subHeading = document.createElement('h3')
  const list = document.createElement('ul')

  heading.textContent = 'Todos'
  container.id = 'container'
  subHeading.textContent = 'DOM Codegrade Assignment'

  container.append(heading)
  container.append(subHeading)
  container.append(list)

  todos.forEach(todo => {
    const toggle = () => axios.patch(`http://localhost:9000/api/todos/${todo.id}`)
      .then(() => {
        container.outerHTML = ''
        todoApp()
      })
      .catch(err => console.log(JSON.stringify(err)))

    const li = document.createElement('li')
    const span = document.createElement('span')
    const button = document.createElement('button')

    span.textContent = `${todo.name} ${todo.complete ? 'DONE' : 'pending'}`
    button.textContent = todo.complete ? 'not' : 'complete'
    button.addEventListener('click', toggle)

    li.append(span)
    li.append(button)
    list.append(li)
  })
  document.body.append(container)
}
