import san from 'san';

const App = san.defineComponent({
  template: '<p>Hello {{name}}!</p>',
  initData() {
    return {
      name: 'San',
    };
  },
});

const app = new App();
app.attach(document.querySelector('#root'));
