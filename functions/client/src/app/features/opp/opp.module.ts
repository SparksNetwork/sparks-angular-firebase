import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OppComponent } from './client/src/app/features/opp/opp/opp.component';
import { OppHeaderDetailsComponent } from './client/src/app/features/opp/opp-header-details/opp-header-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OppComponent, OppHeaderDetailsComponent]
})
export class OppModule { }
