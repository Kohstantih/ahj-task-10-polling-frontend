import {
  interval, take, catchError, map,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

export default class PollingControll {
  constructor(widget) {
    this.widget = widget;

    this.url = 'https://ahj-task-11-polling-backend.onrender.com';

    this.getUnreadMessages = this.getUnreadMessages.bind(this);
  }

  activation() {
    interval(2000)
      .pipe(take(3))
      .subscribe({
        next: () => {
          this.getUnreadMessages();
        },
        error: (err) => console.log(err),
        complete: () => console.log('Interval stopped after five cycles'),
      });
  }

  getUnreadMessages() {
    const stream$ = ajax.getJSON(`${this.url}/messages/unread`).pipe(
      map((response) => response),
      catchError((error) => {
        console.log('error: ', error);
      }),
    );
    stream$.subscribe({
      next: (value) => {
        if (value.status === 'ok') value.messages.forEach((m) => this.widget.createMsgEl(m));
      },
      error: (err) => console.log(err),
      complete: () => console.log('Ajax fulfilled the request'),
    });
  }
}
