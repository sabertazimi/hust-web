import { router } from 'san-router';

import App from './App.san';
import {
  Task1,
} from './components';

import './index.css';

router.add({ rule: '/', Component: App, target: '#app' });
router.add({ rule: '/task1', Component: Task1, target: '#app' });
router.start();
