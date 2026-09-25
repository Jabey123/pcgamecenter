const $ = selector => document.querySelector(selector);
function render() {
  const query = $('#search').value.trim().toLowerCase();
  const sort = $('#sort').value;
  let list = games.filter(game => game[0].toLowerCase().includes(query));
  if (sort === 'low') list.sort((a, b) => Number(a[1]) - Number(b[1]));
  if (sort === 'high') list.sort((a, b) => Number(b[1]) - Number(a[1]));
  $('#products').innerHTML = list.map(game => {
    const id = games.indexOf(game);
    const badge = game[2] ? `<span class="badge">${Math.round((1 - game[1] / game[2]) * 100)}% off</span>` : '';
    return `<article class="product"><a class="product-link" href="product.html?id=${id}"><div class="image-wrap"><img src="${game[3]}" alt="${game[0]}">${badge}</div></a><div class="product-info"><span class="platform">PC GAME</span><a class="product-link" href="product.html?id=${id}"><h2>${game[0]}</h2></a><div class="price-row">${game[2] ? `<span class="old-price">${money(game[2])}</span>` : ''}<span class="price ${game[2] ? 'sale' : ''}">${money(game[1])}</span></div><a class="buy product-buy" href="product.html?id=${id}">View game</a></div></article>`;
  }).join('');
}
$('#search').addEventListener('input', render);
$('#sort').addEventListener('input', render);
$('#menuButton').onclick = () => document.querySelector('footer').scrollIntoView();
setupCurrency(render);
