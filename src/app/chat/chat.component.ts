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
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  comments$: Observable<Comment[]>; // コメントデータ（データストア）
  commentsRef: AngularFireList<Comment>; // realtimeDB を操作するためのインタフェース
  currentUser: User;

  chatMessage = ''; // 入力されるinput

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.commentsRef = db.list('/comments'); // DBからリスト参照（AngularFireList<T>）を返却
  }

  ngOnInit(): void {
    // ログイン状態のユーザーを `currentUser` に代入
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.currentUser = new User(user);
      }
    });

    /**
     * 一旦放置
     *
     * this.currentUser = new User(user);
     * ここで代入しているが、undefined になり、エラーが吐かれる時がある
     */
    // console.log(this.currentUser);

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
