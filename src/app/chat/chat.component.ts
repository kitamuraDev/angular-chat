import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/database';

import { Comment } from '../class/comment';
import { User } from '../class/user';

const CURRENT_USER: User = new User(1, '五十川 洋平');
const ANOTHER_USER: User = new User(2, '竹井 賢治');

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  comments$: Observable<Comment[]>; // コメントデータ（データストア）
  commentsRef: AngularFireList<Comment>; // realtimeDB を操作するためのインタフェース
  currentUser = CURRENT_USER;

  chatMessage = ''; // 入力されるinput

  constructor(private db: AngularFireDatabase) {
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

  ngOnInit(): void {}

  // チャットの追加
  addChatMessage(message: string): void {
    if (message) {
      this.commentsRef.push(
        new Comment({ user: this.currentUser, message: message })
      );
      this.chatMessage = ''; // 入力エリアのリセット
    }
  }

  // チャットの編集
  updateComment(comment: Comment): void {
    const { key, message } = comment;
    this.commentsRef.update(key, { message }); // key は realtimeDB の key（NVe-AnrxgBFuSBDKZOO <- こんなやつ）
  }

  // チャットの削除
  deleteComment(comment: Comment): void {
    this.commentsRef.remove(comment.key);
  }
}
