// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { describe, expect, it } from 'vitest';
import { PT_PER_CM, marginFromPt, marginToPt } from './marginUnits';

describe('marginUnits', () => {
  it('converte centímetros para pontos', () => {
    expect(marginToPt('2.54', false)).toBeCloseTo(72);
    expect(marginToPt('1', false)).toBeCloseTo(PT_PER_CM);
  });

  it('mantém o valor quando já está em pontos', () => {
    expect(marginToPt('36', true)).toBe('36');
  });

  it('deixa vazio e inválido para a validação', () => {
    expect(marginToPt('', false)).toBe('');
    expect(marginToPt(null, false)).toBe(null);
    expect(marginToPt('abc', false)).toBe('abc');
  });

  it('exibe pontos em centímetros com 2 casas', () => {
    expect(marginFromPt(72, false)).toBe(2.54);
    expect(marginFromPt(10, false)).toBe(0.35);
  });

  it('exibe pontos arredondados quando em pontos', () => {
    expect(marginFromPt(28.3464567, true)).toBe(28.35);
    expect(marginFromPt(36, true)).toBe(36);
  });
});
