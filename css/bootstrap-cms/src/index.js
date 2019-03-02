import './index.scss';
import 'bootstrap';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor
  .create(document.querySelector('#pageEditor'), {
    placeholder: 'Enter Page Content',
  })
  .catch(() => {
    const ckeAlert = document.querySelector('#ckeAlert');

    if (ckeAlert) {
      ckeAlert.classList.remove('d-none');
      ckeAlert.classList.add('show');
    }
  });
