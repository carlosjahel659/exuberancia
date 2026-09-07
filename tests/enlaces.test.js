import test from 'node:test'
import assert from 'node:assert/strict'
import { enlaceSeguro } from '../src/utils/enlaces.js'

test('enlaces incompletos y esquemas ejecutables nunca se publican', () => {
  for (const url of [undefined, '', '[GOOGLE_MAPS_URL]', 'javascript:alert(1)', 'data:text/html,x', '//example.com', 'https://usuario:clave@example.com']) {
    assert.equal(enlaceSeguro(url), null)
  }
  assert.equal(enlaceSeguro('https://example.com/\nmal'), null)
})

test('anclas y enlaces confirmados mantienen un destino seguro', () => {
  assert.equal(enlaceSeguro('#categoria-bebidas'), '#categoria-bebidas')
  assert.equal(enlaceSeguro('tel:+525512345678'), 'tel:+525512345678')
  assert.equal(enlaceSeguro('https://www.facebook.com/profile.php?id=61594189674321'), 'https://www.facebook.com/profile.php?id=61594189674321')
})
