import moment from 'moment'

export const dateTimeFormat = function (value, options) {
  const { defaultValue, format } = Object.assign({}, {
    defaultValue: null,
    format: 'MMM DD, Y hh:mm a'
  }, options)
  if (!value) {
    return defaultValue
  }

  return moment(value).format(format)
}
