import { router } from 'san-router'
import App from './App.san'
import * as Tasks from './components/task'
import './index.css'

router.add({ rule: '/', Component: App, target: '#app' })

Object.keys(Tasks).forEach((task) => {
  const Task = Tasks[task]
  router.add({ rule: `/${task}`, Component: Task, target: '#app' })
})

router.start()
