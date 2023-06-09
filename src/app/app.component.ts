import { Component } from '@angular/core';

@Component({
  selector: 'ac-root',
  template: `
    <ac-header></ac-header>
    <div class="page">
      <!-- ルーティングで設定したコンポーネントが描画される -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
