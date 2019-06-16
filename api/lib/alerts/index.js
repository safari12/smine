const _ = require('lodash');

class Alerts {
  constructor(conditions, mailer) {
    this.conditions = conditions;
    this.mailer = mailer;
  }

  send(sourceItems, updatedItems) {
    if (sourceItems.length === updatedItems.length) {
      const messages = this.getMessages(sourceItems, updatedItems);

      if (messages.length > 0) {
        const html = this.getHtml(messages);
        this.mailer.sendMail('SMine Alerts', html);
      }
    }
  }

  /*
  get messages where conditions are met
  */
  getMessages(sourceItems, updatedItems) {
    let messages = [];

    for (let i = 0; i < sourceItems.length; i++) {
      const sourceItem = sourceItems[i];
      const updatedItem = updatedItems[i];
      const results = _.map(this.conditions, c => c(sourceItem, updatedItem));

      messages.push(
        _.map(
          _.filter(results, 'met'),
          r => `${sourceItem.hostname} - ${r.message}`
        )
      );
    }

    return _.flatten(messages);
  }

  getHtml(messages) {
    let html = '<ul>';
    _.concat(html, _.map(messages, m => `<li>${m}</li>`));
    _.concat(html, '</ul>');
    return html;
  }
}

module.exports = Alerts;
