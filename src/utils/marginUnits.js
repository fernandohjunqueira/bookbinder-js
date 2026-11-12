// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// As margens são sempre guardadas em pontos na configuração; o formulário pode
// exibi-las em centímetros (padrão) ou em pontos.

export const PT_PER_CM = 72 / 2.54;

/** Campos de margem do layout da página: chave na configuração -> nome no formulário. */
export const MARGIN_FIELDS = {
  mainForeEdgePaddingPt: 'main_fore_edge_padding_pt',
  bindingEdgePaddingPt: 'binding_edge_padding_pt',
  topEdgePaddingPt: 'top_edge_padding_pt',
  bottomEdgePaddingPt: 'bottom_edge_padding_pt',
};

/**
 * Converte o valor digitado no formulário para pontos.
 * Valores vazios ou inválidos passam sem alteração para a validação da configuração.
 * @param { FormDataEntryValue | null } value
 * @param { boolean } inPt Se o valor já está em pontos
 */
export function marginToPt(value, inPt) {
  if (inPt || value === null || value === '' || isNaN(value)) return value;
  return Number(value) * PT_PER_CM;
}

/**
 * Converte um valor em pontos para o que deve ser exibido no formulário.
 * @param { number } pt
 * @param { boolean } inPt Se o formulário exibe pontos
 */
export function marginFromPt(pt, inPt) {
  const value = inPt ? pt : pt / PT_PER_CM;
  return Math.round(value * 100) / 100;
}

/**
 * Preenche os campos de margem e os rótulos de unidade.
 * @param { Record<string, number> } ptValues Valores em pontos, indexados pela chave da configuração
 * @param { boolean } inPt Se o formulário deve exibir pontos
 */
export function renderMarginFields(ptValues, inPt) {
  Object.entries(MARGIN_FIELDS).forEach(([key, name]) => {
    document.querySelector(`input[name="${name}"]`).value = marginFromPt(ptValues[key], inPt);
  });
  document.querySelector('input[name="margins_in_pt"]').checked = inPt;
  document.querySelectorAll('.margin_unit').forEach((el) => {
    el.innerText = inPt ? 'pt' : 'cm';
  });
}

/**
 * Ao trocar a unidade, converte os valores já digitados para que continuem
 * representando a mesma medida. Deve rodar antes de o formulário ser salvo.
 * @param { boolean } nowInPt Novo estado da opção "em pontos"
 */
export function handleMarginUnitToggle(nowInPt) {
  const ptValues = {};
  Object.entries(MARGIN_FIELDS).forEach(([key, name]) => {
    const value = document.querySelector(`input[name="${name}"]`).value;
    ptValues[key] = Number(marginToPt(value, !nowInPt)) || 0;
  });
  renderMarginFields(ptValues, nowInPt);
}
