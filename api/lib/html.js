const _ = require('lodash/fp').convert({
  rearg: true
});

/**
 * Class that generates html tags
 */
class HTML {
  static generateList(messages) {
    return _.pipe(
      _.concat(_.map(m => `<li>${m}</li>`)(messages)),
      _.concat('</ul>')
    )('<ul>');
  }
}

module.exports = HTML;
