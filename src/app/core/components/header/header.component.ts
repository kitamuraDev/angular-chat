import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    // onAuthStateChanged: ログイン状態が切り替わる度にコールバックが実行される
    this.afAuth.onAuthStateChanged((user: firebase.User) => {
      this.isLogin = user ? true : false;
    });
  }
}
