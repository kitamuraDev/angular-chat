import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

const CURRENT_USER: User = new User(1, '五十川 洋平');
const ANOTHER_USER: User = new User(2, '竹井 賢治');

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  comments$: Observable<Comment[]>; // コメントデータ（データストア）
  commentsRef: AngularFireList<Comment>; // realtimeDB を操作するためのインタフェース
  currentUser = CURRENT_USER;
  chatMessage = ''; // 入力されるinput

  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges(); // '/item' からデータを取得して、valueChanges() で Observable に変換する
    this.commentsRef = db.list('/comments'); // DBからリスト参照（AngularFireList<T>）を返却
    this.comments$ = this.commentsRef.valueChanges(); // Observable に変換して comments$ へ代入
  }

  // 送信ボタンのクリックイベント
  addChatMessage(message: string): void {
    if (message) {
      this.commentsRef.push(new Comment(this.currentUser, message));
      this.chatMessage = ''; // 入力エリアのリセット
    }
  }
}
