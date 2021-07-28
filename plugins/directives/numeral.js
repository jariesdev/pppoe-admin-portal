const numberOnly = function (event) {
  if (event.charCode === 46 && String(event.target.value).match(/\./) === null) {
    // allow 1 dot
  } else if (event.charCode < 48 || event.charCode > 57) {
    event.preventDefault()
  }
}

export default {
  bind (el, binding, vnode) {
    el.addEventListener('keypress', numberOnly)
  },
  unbind (el) {
    el.removeEventListener('keypress', numberOnly)
  }
}
