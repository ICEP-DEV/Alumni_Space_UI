import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
//import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ViewProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'view-profile',component: ViewProfileComponent },
      { path: 'edit-profile',component: EditProfileComponent },
    ]),
    //NgxExtendedPdfViewerModule
    PdfViewerModule
  ]
})
export class ProfileModule { }
