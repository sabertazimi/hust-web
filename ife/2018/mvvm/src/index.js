import { router } from 'san-router';

import App from './App.san';
import {
  Task1,
  Task2,
} from './components';

import './index.css';

router.add({ rule: '/', Component: App, target: '#app' });
router.add({ rule: '/task1', Component: Task1, target: '#app' });
router.add({ rule: '/task2', Component: Task2, target: '#app' });
router.start();
