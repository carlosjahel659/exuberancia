import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const categorias = ['desayunos', 'entradas', 'mexicana', 'finde', 'barbacoa', 'bebidas']

async function sinDesbordamiento(page) {
  const overflow = await page.evaluate(() => ({ ancho: innerWidth, contenido: document.documentElement.scrollWidth }))
  expect(overflow.contenido).toBeLessThanOrEqual(overflow.ancho + 1)
}

for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
  test('carta navegable y sin desbordamiento a ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 })
    const errores = [], faltantes = []
    page.on('pageerror', error => errores.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errores.push(message.text()) })
    page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1')) faltantes.push(response.url()) })
    await page.goto('?dia=lunes&hora=20:00')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.getByRole('link', { name: /Explorar el menú/ })).toHaveCSS('background-color', 'rgb(240, 179, 35)')
    await expect(page.getByText('Modo de prueba:', { exact: true })).toBeVisible()
    await sinDesbordamiento(page)
    for (const id of categorias) {
      await page.goto('?dia=domingo&hora=' + (id === 'mexicana' ? '13:00' : '10:00'))
      await expect(page.locator('#categoria-' + id)).not.toHaveAttribute('aria-disabled', 'true')
      await page.locator('#categoria-' + id).click()
      await expect(page.locator('#panel-' + id)).toBeVisible()
      await expect(page.locator('#categorias')).toBeVisible()
      for (const otra of categorias) await expect(page.locator('#categoria-' + otra)).toBeVisible()
      await expect(page.locator('#panel-' + id)).toContainText('Disponible ahora')
      await sinDesbordamiento(page)
      if (width === 390 && id === 'desayunos') await page.screenshot({ path: 'test-results/menu-movil.png', fullPage: true })
      await page.keyboard.press('Escape')
      await expect(page.locator('#categoria-' + id)).toBeFocused()
    }
    if (width === 1440) { await page.goto(''); await page.screenshot({ path: 'test-results/inicio-escritorio.png', fullPage: true }) }
    expect(errores).toEqual([])
    expect(faltantes).toEqual([])
  })
}

test('variantes, promociones, enlaces y navegación por teclado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('?dia=domingo&hora=13:00#categoria-bebidas')
  const cantarito = page.locator('#panel-bebidas article').filter({ has: page.getByRole('heading', { name: 'Cantarito', exact: true }) })
  await expect(cantarito).toContainText('$85')
  await cantarito.getByRole('button', { name: /^5 litros/ }).click()
  await expect(cantarito.locator('[aria-live]')).toHaveText('$649')
  await expect(page.locator('#promociones article')).toHaveCount(6)
  await expect(page.locator('a[href*="["]')).toHaveCount(0)
  expect(await page.locator('a[target="_blank"]').evaluateAll(links => links.every(link => link.rel.includes('noopener') && link.rel.includes('noreferrer')))).toBe(true)
  await page.getByRole('button', { name: 'Abrir navegación', exact: true }).click()
  await expect(page.locator('#menu-movil')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#menu-movil')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Abrir navegación', exact: true })).toBeFocused()
  const pequenos = await page.locator('a[href],button:not(:disabled),summary').evaluateAll(nodes => nodes.filter(n => {
    const r = n.getBoundingClientRect()
    return r.width > 0 && r.height > 0 && !n.classList.contains('sr-only') && (r.width < 44 || r.height < 44)
  }).map(n => ({ texto: n.textContent.trim(), ancho: n.getBoundingClientRect().width, alto: n.getBoundingClientRect().height })))
  expect(pequenos).toEqual([])
})

test('categorías persistentes y acceso a promociones debajo de la cuadrícula', async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('?dia=domingo&hora=13:00#categorias')
    const mexicana = page.locator('#categoria-mexicana')
    await expect(mexicana).not.toHaveAttribute('aria-disabled', 'true')
    await mexicana.scrollIntoViewIfNeeded()
    const desplazamiento = await page.evaluate(() => scrollY)
    await mexicana.click()
    await expect(page.locator('#panel-mexicana')).toBeVisible()
    expect(Math.abs(await page.evaluate(() => scrollY) - desplazamiento)).toBeLessThan(5)
    await expect(mexicana).toBeInViewport()
    await page.locator('#categoria-bebidas').click()
    await expect(page.locator('#panel-bebidas')).toBeVisible()
    await expect(page.locator('#panel-mexicana')).toHaveCount(0)
    await expect(page.locator('#categoria-bebidas')).toHaveAttribute('aria-expanded', 'true')
    await expect(mexicana).toHaveAttribute('aria-expanded', 'false')
    const promo = page.locator('#categorias').getByRole('link', { name: 'Promociones Exuberantes', exact: true })
    const grid = await page.locator('#categorias ul').boundingBox()
    const acceso = await promo.boundingBox()
    expect(acceso.y).toBeGreaterThanOrEqual(grid.y + grid.height)
    expect(Math.abs(acceso.width - grid.width)).toBeLessThan(1)
    await page.locator('#panel-bebidas').getByRole('link', { name: '↑ Cambiar categoría', exact: true }).click()
    await expect(page.locator('#categoria-bebidas')).toBeInViewport()
    await expect(page.locator('#panel-bebidas')).toBeVisible()
    await promo.click()
    await expect(page).toHaveURL(/#promociones$/)
    await expect(page.locator('#promos-exuberantes')).toBeInViewport()
    await sinDesbordamiento(page)
  }
})

test('accesibilidad WCAG AA en portada y categorías con mayor contenido', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const hash of ['', '#categoria-desayunos', '#categoria-bebidas', '#categoria-barbacoa']) {
    await page.goto('?dia=domingo&hora=' + (hash.includes('desayunos') ? '10:00' : '13:00') + hash)
    await page.evaluate(() => document.fonts.ready)
    const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(resultado.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([])
  }
})

test('HTML sin JavaScript, SEO y recursos del subdirectorio', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/exuberancia/')
  const carta = page.locator('#carta-estatica details').filter({ has: page.getByRole('heading', { name: 'Barbacoa', exact: true }) })
  await carta.locator('summary').click()
  await expect(carta).toContainText('Precio por confirmar')
  const json = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())
  expect(JSON.stringify(json)).toContain('Restaurant')
  expect(JSON.stringify(json)).toContain('MenuItem')
  expect((await page.locator('meta[name="description"]').getAttribute('content')).length).toBeLessThanOrEqual(160)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://carlosjahel659.github.io/exuberancia/')
  for (const resource of ['sitemap.xml', 'robots.txt', 'assets/favicon.png', 'assets/og-exuberancia.jpg']) expect((await request.get(resource)).status()).toBe(200)
  await context.close()
})

test('candados y horarios impiden abrir categorías fuera de servicio', async ({ page }) => {
  for (const escenario of [
    { dia: 'lunes', hora: '10:00', cerradas: ['mexicana', 'finde', 'barbacoa'] },
    { dia: 'sabado', hora: '13:00', cerradas: ['desayunos', 'barbacoa'] },
    { dia: 'domingo', hora: '19:30', cerradas: categorias },
    { dia: 'lunes', hora: '08:00', cerradas: categorias },
  ]) {
    await page.goto('?dia=' + escenario.dia + '&hora=' + escenario.hora)
    await expect(page.getByText('Modo de prueba:', { exact: true })).toBeVisible()
    for (const id of escenario.cerradas) {
      const boton = page.locator('#categoria-' + id)
      await expect(boton).toHaveAttribute('aria-disabled', 'true')
      await boton.focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('#panel-' + id)).toHaveCount(0)
      await boton.click({ force: true })
      await expect(page.locator('#panel-' + id)).toHaveCount(0)
    }
  }
  await page.goto('?dia=lunes&hora=13:00#categoria-barbacoa')
  await expect(page.locator('#categoria-barbacoa')).toHaveAttribute('aria-disabled', 'true')
  await expect(page.locator('#panel-barbacoa')).toHaveCount(0)
})
