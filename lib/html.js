const _ = require('lodash')

/**
 * Class that generates html tags
 */
class HTML {

  /**
   * Generates a HTML list tag
   * @param {Array} items 
   */
  static generateListTag(items) {
    let content = '<ul>\n'

    _.each(items, (i) => {
      content += `<li>${i}</li>\n`
    })

    content += '</ul>\n'

    return content
  }

  /**
   * Generates a header from size
   * @param {number} size 
   * @param {string} text 
   */
  static generateHeaderTag(size, text) {
    return `<h${size}>${text}</h${size}>`
  }
}

module.exports = HTML
