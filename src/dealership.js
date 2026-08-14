const DEALER_API = 'https://rebzpikwqxmwajdimfld.supabase.co/rest/v1/dealerships?slug=eq.autosfull&select=*&limit=1'
const DEALER_KEY = 'sb_publishable_dvwP1aVUTSHvmNcqn-IDEw_f0R2KO7D'
const dealerPromise = fetch(DEALER_API, { headers: { apikey: DEALER_KEY, Authorization: 'Bearer ' + DEALER_KEY } }).then(r => r.json()).then(rows => rows[0]).catch(() => null)
const previousFetch = window.fetch.bind(window)
window.fetch = async (input, init = {}) => {
  if (String(input).includes('/rest/v1/vehicles') && String(init.method).toUpperCase() === 'POST' && init.body) {
    const dealer = await dealerPromise
    if (dealer) { const body = JSON.parse(init.body); body.dealership_id = dealer.id; init = { ...init, body: JSON.stringify(body) } }
  }
  return previousFetch(input, init)
}
