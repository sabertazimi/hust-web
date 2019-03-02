import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './index.scss';
import 'bootstrap';

ClassicEditor
  .create(document.querySelector('#pageEditor'), {
    placeholder: 'Enter Page Content',
  })
  .catch(() => {
    const ckeAlert = document.querySelector('#ckeAlert');
    ckeAlert.classList.remove('d-none');
    ckeAlert.classList.add('show');
  });
