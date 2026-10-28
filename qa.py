import asyncio, json
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/google-chrome', headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
        errors=[]
        page.on('pageerror', lambda e: errors.append(str(e)))
        await page.goto('http://localhost:4200', wait_until='networkidle')
        await page.screenshot(path='/home/user/sive/desktop-qa.png', full_page=True)
        await page.get_by_role('tab', name='Liquidación').click()
        assert 'tarifas parametrizables' in await page.locator('#stage-detail').inner_text()
        await page.locator('input[name=email]').fill('usuario@organismo.gov.co')
        await page.locator('input[name=password]').fill('Clave123')
        await page.get_by_role('button', name='Mostrar contraseña').click()
        assert await page.locator('input[name=password]').get_attribute('type') == 'text'
        await page.get_by_role('button', name='Iniciar sesión', exact=True).click()
        assert 'no se ha iniciado sesión' in await page.get_by_role('status').inner_text()
        await page.get_by_role('button', name='¿Olvidaste tu contraseña?').click()
        await page.locator('input[name=email]').fill('usuario@organismo.gov.co')
        await page.get_by_role('button', name='Recuperar contraseña', exact=True).click()
        assert 'No se ha enviado' in await page.get_by_role('status').inner_text()
        await page.get_by_role('button', name='Solicitar suscripción', exact=True).click()
        await page.locator('input[name=organism]').fill('Organismo de prueba')
        await page.locator('input[name=email]').fill('usuario@organismo.gov.co')
        await page.locator('.consent input').check()
        await page.get_by_role('button', name='Solicitar suscripción', exact=True).first.click()
        assert 'no se ha enviado ni guardado' in await page.get_by_role('status').inner_text()
        await page.get_by_role('button', name='Privacidad', exact=True).click()
        assert await page.get_by_role('dialog').is_visible()
        await page.keyboard.press('Escape')
        assert not await page.get_by_role('dialog').is_visible()
        await page.get_by_role('button', name='Ingresar', exact=True).click()
        await page.set_viewport_size({'width':390,'height':844})
        await page.screenshot(path='/home/user/sive/mobile-qa.png',full_page=True)
        assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
        await page.get_by_role('button',name='Abrir navegación').click()
        await page.get_by_role('button',name='Quiénes somos',exact=True).click()
        assert await page.get_by_role('dialog').is_visible()
        print(json.dumps({'checks':'desktop/mobile, forms, password, stages, modal and menu passed', 'pageErrors':errors}))
        await browser.close()

asyncio.run(main())