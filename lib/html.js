const _ = require('lodash')

/**
 * Class that generates html tags
 */
class HTML {
  static generateListTag(items) {
    let content = '<ul>\n'

    _.each(items, (i) => {
      content += `<li>${i}</li>\n`
    })

    content += '</ul>\n'

    return content
  }

  static generateH3Tag(message) {
    return `<h3>${message}</h3>\n`
  }
}

module.exports = HTML
