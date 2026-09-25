const currencyConfig = {
  GHS: { locale: 'en-GH', symbol: 'GH₵' }, NGN: { locale: 'en-NG', symbol: '₦' },
  USD: { locale: 'en-US', symbol: '$' }, GBP: { locale: 'en-GB', symbol: '£' },
  EUR: { locale: 'en-IE', symbol: '€' }, CAD: { locale: 'en-CA', symbol: 'CA$' },
  ZAR: { locale: 'en-ZA', symbol: 'R' }, KES: { locale: 'en-KE', symbol: 'KSh' }
};
let activeCurrency = 'GHS';
let exchangeRates = { GHS: 1 };
function suggestedCurrency() {
  const country = (navigator.language || 'en-GH').split('-')[1] || 'GH';
  return ({ GH:'GHS', NG:'NGN', US:'USD', GB:'GBP', IE:'EUR', FR:'EUR', DE:'EUR', CA:'CAD', ZA:'ZAR', KE:'KES' })[country] || 'GHS';
}
function money(value) {
  const config = currencyConfig[activeCurrency];
  return new Intl.NumberFormat(config.locale, { style: 'currency', currency: activeCurrency, maximumFractionDigits: 2 }).format(Number(value) * (exchangeRates[activeCurrency] || 1));
}
async function setupCurrency(onChange) {
  activeCurrency = suggestedCurrency();
  const picker = document.querySelector('#currency');
  if (picker) picker.value = activeCurrency;
  onChange();
  try { const response = await fetch('https://open.er-api.com/v6/latest/GHS'); const data = await response.json(); if (data.result === 'success') exchangeRates = data.rates; } catch (_) { /* GHS prices remain available if live rates cannot load. */ }
  onChange();
  picker?.addEventListener('change', event => { activeCurrency = event.target.value; onChange(); });
}
