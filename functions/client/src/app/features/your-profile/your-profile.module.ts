import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { YourApplicationRoutingModule, routedComponents } from './your-profile-routing.module'
import { HeaderComponent } from './header/header.component'
import { RowQuestComponent } from './row-quest/row-quest.component'
import { SectionQuestsOpenComponent } from './section-quests-open/section-quests-open.component'

@NgModule({
  declarations: [
    ...routedComponents,
    HeaderComponent,
    RowQuestComponent,
    SectionQuestsOpenComponent,
  ],
  imports: [
    CommonModule,
    SNUIModule,
    YourApplicationRoutingModule,
  ],
  providers: [],
})
export class YourProfileModule { }

