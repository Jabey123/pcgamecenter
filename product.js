const index = Number(new URLSearchParams(location.search).get('id'));
const game = games[index];
const whatsapp = name => `https://wa.me/233541603246?text=${encodeURIComponent(`Hi! pc gamecenter, I’d like to order ${name}, Could you please let me know the available payment methods?`)}`;
const page = document.querySelector('#productPage');
function renderProduct() {
  if (!game) { page.innerHTML = '<section class="not-found"><h1>Game not found</h1><a class="buy-link" href="index.html">Browse all PC games</a></section>'; return; }
  document.title = `${game[0]} — PC GAME CENTER`;
  page.innerHTML = `<section class="product-detail"><div class="detail-image"><img src="${game[3]}" alt="${game[0]}">${game[2] ? `<span class="badge">${Math.round((1-game[1]/game[2])*100)}% off</span>` : ''}</div><div class="detail-copy"><span class="platform">PC GAME</span><h1>${game[0]}</h1><p>Get ready to play. Contact PC GAME CENTER on WhatsApp to confirm availability and receive payment instructions.</p><div class="detail-price">${game[2] ? `<span class="old-price">${money(game[2])}</span>` : ''}<strong>${money(game[1])}</strong></div><a class="checkout-link" href="${whatsapp(game[0])}" target="_blank" rel="noopener">Proceed to WhatsApp checkout</a><p class="secure-note">You will be redirected to WhatsApp with your game request ready to send. Rates by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener">ExchangeRate-API</a>.</p></div></section>`;
}
setupCurrency(renderProduct);
