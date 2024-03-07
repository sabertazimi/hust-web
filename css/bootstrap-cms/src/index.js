import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ScrollReveal from 'scrollreveal'

import './index.scss'
import 'bootstrap'

ClassicEditor.create(document.querySelector('#pageEditor'), {
  placeholder: 'Enter Page Content',
}).catch(() => {
  const ckeAlert = document.querySelector('#ckeAlert')

  if (ckeAlert) {
    ckeAlert.classList.remove('d-none')
    ckeAlert.classList.add('show')
  }
})

const SR = ScrollReveal()

SR.reveal('.srjs-left', {
  origin: 'left',
  duration: 2000,
  distance: '300px',
})

SR.reveal('.srjs-right', {
  origin: 'right',
  duration: 2000,
  distance: '300px',
})

SR.reveal('.srjs-top', {
  origin: 'top',
  duration: 2000,
  distance: '300px',
})

SR.reveal('.srjs-bottom', {
  origin: 'bottom',
  duration: 2000,
  distance: '50px',
})
