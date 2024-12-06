import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetHistoryRoutingModule } from './bet-history-routing.module';
import { FilterComponent } from './views/filter/filter.component';
import { DataListingComponent } from './views/data-listing/data-listing.component';
import { BetHistoryComponent } from './bet-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelTicketComponent } from './views/model-ticket/model-ticket.component';


@NgModule({
  declarations: [
    FilterComponent,
    DataListingComponent,
    BetHistoryComponent,
    ModelTicketComponent,
  ],
  imports: [
    CommonModule,
    BetHistoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class BetHistoryModule { }
