import Vue from 'vue'
import { dateTimeFormat } from '~/util/utilities'

const numeral = require('numeral')

Vue.filter('formatNumber', (value, options) => {
  const { format } = options || {}
  if (format) {
    return numeral(value).format(format)
  } else {
    return numeral(value).format('0,0')
  }
})

Vue.filter('humanizeTimeAllocation', (value) => {
  const replaceTimeArray = function (searches, replacements, subject) {
    for (let i = 0; i < searches.length; i++) {
      const find = searches[i]
      let replace = replacements[i]

      if (replace === undefined) { continue }

      const re = new RegExp(`\\d+(?=${find})`)
      if (subject.match(re) === null) { continue }

      const numberBeforeUnit = String(subject).match(re)
      if (numberBeforeUnit !== null) {
        const ra = replace.split('|')
        replace = parseInt(numberBeforeUnit[0]) > 1 ? ra[1] : ra[0]
      } else {
        replace = replace.split('|')[0]
      }
      subject = String(subject).replaceAll(find, replace, subject)
    }

    return subject
  }

  return replaceTimeArray(
    ['d', 'h', 'm', 's'],
    [' day| days', ' hour| hours', ' minute| minutes', ' second| seconds'],
    value.toLowerCase())
})

Vue.filter('formatDateAndTime', (value, options) => {
  return dateTimeFormat(value, options)
})
