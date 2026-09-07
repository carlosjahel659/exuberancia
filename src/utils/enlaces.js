/** Solo protocolos previstos; los marcadores nunca se convierten en rutas. */
export function enlaceSeguro(valor) {
  if (typeof valor !== 'string') return null
  const url = valor.trim()
  if (!url || url.includes('[') || /[\u0000-\u0020\u007f]/.test(url)) return null
  if (/^#[a-zA-Z][\w-]*$/.test(url)) return url
  if (/^tel:\+?[\d()-]+$/.test(url)) return url
  if (/^mailto:[^@]+@[^@]+\.[^@]+$/.test(url)) return url
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password ? parsed.href : null
  } catch { return null }
}
