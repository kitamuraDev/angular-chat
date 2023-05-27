import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: ChatComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
