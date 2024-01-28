import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { QueryEntryComponent } from './query-entry/query-entry.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { HeaderComponent } from './header/header.component';
import { FaqsComponent } from './faqs/faqs.component';



@NgModule({
  declarations: [
    QueryEntryComponent,
    SuccessDialogComponent,
    HeaderComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',component: QueryEntryComponent },
    ]),
  ]
})
export class QueriesModule { }
