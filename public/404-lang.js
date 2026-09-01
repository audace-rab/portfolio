;(function () {
  var lang = (navigator.language || 'fr').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en'
  document.documentElement.lang = lang
  ;[].forEach.call(document.querySelectorAll('.' + lang), function (el) {
    el.style.display = 'block'
  })
})()