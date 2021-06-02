import moment from 'moment'

export const defaultDateTimeFormat = function (value, options) {
  const { defaultValue } = Object.assign({}, options, {
    defaultValue: null
  })
  if (!value) {
    return defaultValue
  }

  return moment(value).format('MMM DD, Y hh:mm a')
}
