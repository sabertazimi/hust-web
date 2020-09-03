import sub from './c.js';

const add = (a, b) => (sub(a, a) + a + b);

export default add;
