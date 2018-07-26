export function checkWebp (callback = setImageByWebp) {
  window.isSupportWebp = window.isSupportWebp || localStorage.getItem('isSupportWebp')
  if (/^(true|false)$/.test(window.isSupportWebp)) {
    callback(window.isSupportWebp)
    return
  }
  new Promise((resolve) => {
    const img = new Image()
    img.onload = function () {
      resolve(`${img.width > 0 && img.height > 0}`)
    }
    img.onerror = function () {
      resolve('false')
    }
    img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  }).then((res) => {
    window.isSupportWebp = res
    localStorage.setItem('isSupportWebp', res)
    callback(res)
  })
}

function setImageByWebp (isSupportWebp) {
  var imgs = Array.from(document.querySelectorAll('img'))
  imgs.forEach (function(i) {
    if (!i.attributes['data-src']) return
    var src = i.attributes['data-src'].value
    if (`${isSupportWebp}` === 'true'){
      src += '.webp'
    }
    i.src = src
  })
  // 设置根dom的class=webps，以便css中进行区分
  document.documentElement.className += " webps";
}
