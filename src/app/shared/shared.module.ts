import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentDatePipe } from '../pipes/comment-date.pipe';

@NgModule({
  declarations: [CommentDatePipe],
  imports: [CommonModule, FormsModule],
  exports: [FormsModule, CommentDatePipe],
})

// 共通で使用する用のモジュール
export class SharedModule {}
