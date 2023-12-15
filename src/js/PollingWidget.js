import FactoryElements from './FactoryElements';
import GetDate from './GetDate';

export default class PollingWidget {
  constructor(container) {
    this.container = container;

    this.messageList = this.container.querySelector('.messages_list');
  }

  createMsgEl(obj) {
    const message = FactoryElements.createElement('li', ['message']);

    const name = FactoryElements.createElement('p', ['author_message', 'item_message']);
    name.textContent = obj.from;
    message.append(name);
    const subject = FactoryElements.createElement('p', ['subject_message', 'item_message']);
    subject.textContent = PollingWidget.checkSubject(obj.subject);
    message.append(subject);
    const date = FactoryElements.createElement('p', ['date_message', 'item_message']);
    date.textContent = GetDate.getFormatDate(obj.received);
    message.append(date);

    this.messageList.append(message);
  }

  static checkSubject(subject) {
    if (subject.length < 15) {
      return subject;
    }
    const result = `${subject.slice(0, 15)}...`;
    return result;
  }
}
