import { Component } from '@angular/core';

import { Comment } from './class/comment';

// prettier-ignore
const COMMENTS: Comment[] = [
  { name: '武井 賢治', message: 'こんにちは', },
  { name: '福永 治', message: 'どうも、こんにちは。いい天気ですね', },
  { name: '市川 詩織', message: 'お散歩日和ですね！', },
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  comments = COMMENTS;
}
