;(function () {
  SetRem()
  window.addEventListener('resize', SetRem)
  function SetRem () {
    let html = document.documentElement
    let hWidth = html.getBoundingClientRect().width
    let fz = hWidth / 7.5
    html.style.fontSize = fz <= 100 ? fz + 'px' : '100px'
  }
})()
