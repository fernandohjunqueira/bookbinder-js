// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { resetForm } from './formUtils';
import {
  clearPreview,
  updateAddOrRemoveCustomPaperOption,
  updatePaperSelectOptionsUnits,
} from './renderUtils';

export function handleGenerateClick(generateEl, book) {
  generateEl.setAttribute('disabled', true);
  generateEl.style.fontSize = '13px';
  generateEl.innerText = 'Gerando, isso pode levar um tempinho...';
  console.log('The whole Book model:', book);
  const result = book.createoutputfiles(false);
  result
    .then(() => {
      console.log('Generated result!');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      generateEl.removeAttribute('disabled');
      generateEl.style.fontSize = '24px';
      generateEl.innerText = 'Gerar PDF';
    });
}

export function handlePreviewClick(previewEl, book) {
  previewEl.setAttribute('disabled', true);
  previewEl.innerText = 'Gerando pré-visualização...';
  clearPreview();
  const result = book.createoutputfiles(true);
  result
    .then(() => {
      console.log('Preview result!');
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      previewEl.removeAttribute('disabled');
      previewEl.innerText = 'Pré-visualizar PDF';
    });
}

export function handleResetSettingsClick(book) {
  const defaultConfiguration = resetForm();
  book.update(defaultConfiguration);
  updateAddOrRemoveCustomPaperOption();
  updatePaperSelectOptionsUnits();
}

export function handleSewingMarksCheckboxState(sewingMarksEnabled) {
  const sewingMarkDetailsEl = document.getElementById('sewing_marks_details');
  if (sewingMarksEnabled) {
    sewingMarkDetailsEl.setAttribute('open', 0);
  } else {
    sewingMarkDetailsEl.removeAttribute('open');
  }
}
