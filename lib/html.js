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

  static generateHeaderTag(size, text) {
    return `<h${size}>${text}</h${size}>`
  }
}

module.exports = HTML
