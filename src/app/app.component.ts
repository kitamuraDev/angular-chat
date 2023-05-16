import { Component, ViewChild, ElementRef } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

const CURRENT_USER: User = new User(1, '五十川 洋平');
const ANOTHER_USER: User = new User(2, '竹井 賢治');

// prettier-ignore
const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です！'),
  new Comment(ANOTHER_USER, 'この間の件ですが、どうなりましたか？'),
  new Comment(CURRENT_USER, 'お疲れ様です！'),
  new Comment(CURRENT_USER, 'クライアントからOK出ました！'),
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  chatMessage = '';

  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges(); // '/item' からデータを取得して、valueChanges() で Observable に変換する
  }

  // 送信ボタンのクリックイベント
  addChatMessage(message: string): void {
    this.comments.push(new Comment(this.currentUser, message));
  }
}
