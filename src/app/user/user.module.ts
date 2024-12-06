import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditprofileComponent } from './containers/editprofile/editprofile.component';
import { UserhistoryComponent } from './containers/userhistory/userhistory.component';
import { TableComponent } from './views/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransfertHistoryComponent } from './containers/transfert-history/transfert-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditprofileComponent,
    UserhistoryComponent,
    TableComponent,
    TransfertHistoryComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    UserRoutingModule,
    NgbModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
