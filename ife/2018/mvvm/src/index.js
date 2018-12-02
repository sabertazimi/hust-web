import {
  router,
} from 'san-router';

import App from './App.san';

import './index.css';

router.add({ rule: '/', Component: App, target: '#app' });
router.start();
