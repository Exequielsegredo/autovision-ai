const AUTH_URL = 'https://rebzpikwqxmwajdimfld.supabase.co/auth/v1'
const AUTH_KEY = 'sb_publishable_dvwP1aVUTSHvmNcqn-IDEw_f0R2KO7D'
const SESSION_KEY = 'autovision_admin_session'
let session
try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { session = null }
if (session?.expires_at && session.expires_at * 1000 <= Date.now()) {
  localStorage.removeItem(SESSION_KEY)
  session = null
}

const originalFetch = window.fetch.bind(window)
window.fetch = (input, init = {}) => {
  if (session?.access_token && String(input).includes('rebzpikwqxmwajdimfld.supabase.co')) {
    init.headers = { ...(init.headers || {}), Authorization: `Bearer ${session.access_token}` }
  }
  return originalFetch(input, init)
}

function showLogin() {
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.id = 'login-modal'
  modal.innerHTML = `<div class="modal-card login-card"><p class="eyebrow">ACCESO SEGURO</p><h2>AutoVision AI</h2><p class="muted">Ingresá con tu cuenta de administrador.</p><form id="login-form"><label>Correo electrónico<input name="email" type="email" required placeholder="tu@email.com"></label><label>Contraseña<input name="password" type="password" required minlength="6" placeholder="Mínimo 6 caracteres"></label><p class="form-message" id="login-message"></p><button type="submit">Ingresar</button><button class="text-button" type="button" id="signup-button">Crear mi cuenta de administrador</button></form></div>`
  document.body.append(modal)
  const form = modal.querySelector('form'), message = modal.querySelector('#login-message')
  form.addEventListener('submit', async e => {
    e.preventDefault(); const body = Object.fromEntries(new FormData(form)); message.textContent = 'Ingresando…'
    const response = await originalFetch(`${AUTH_URL}/token?grant_type=password`, { method: 'POST', headers: { apikey: AUTH_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await response.json()
    if (!response.ok) { message.textContent = 'Correo o contraseña incorrectos.'; return }
    session = result; localStorage.setItem(SESSION_KEY, JSON.stringify(result)); modal.remove(); location.reload()
  })
  modal.querySelector('#signup-button').addEventListener('click', async () => {
    const body = Object.fromEntries(new FormData(form)); message.textContent = 'Creando cuenta…'
    const response = await originalFetch(`${AUTH_URL}/signup`, { method: 'POST', headers: { apikey: AUTH_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const result = await response.json()
    if (!response.ok) { message.textContent = result.msg || 'No se pudo crear la cuenta.'; return }
    if (result.session) { session = result.session; localStorage.setItem(SESSION_KEY, JSON.stringify(result.session)); modal.remove(); location.reload() }
    else message.textContent = 'Cuenta creada. Revisá tu correo, confirmala y luego ingresá.'
  })
}
function bootLogin() { if (!session?.access_token && !document.getElementById('login-modal')) showLogin() }
if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', bootLogin)
else bootLogin()
