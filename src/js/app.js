import PollingWidget from './PollingWidget';
import PollingControll from './PollingControll';

const container = document.querySelector('.container');

const widget = new PollingWidget(container);
const controller = new PollingControll(widget);

controller.activation();
