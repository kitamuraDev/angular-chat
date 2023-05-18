import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';

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
    this.comments$ = this.commentsRef
      .snapshotChanges() // 実データとデータキーを取得して、Observable に変換する
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map((snapshot) => {
            const value = snapshot.payload.val();
            return new Comment({ key: snapshot.payload.key, ...value });
          });
        })
      );
  }

  // 送信ボタンのクリックイベント
  addChatMessage(message: string): void {
    if (message) {
      this.commentsRef.push(
        new Comment({ user: this.currentUser, message: message })
      );
      this.chatMessage = ''; // 入力エリアのリセット
    }
  }
}
