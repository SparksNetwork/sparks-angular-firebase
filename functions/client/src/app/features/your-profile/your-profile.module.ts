import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SNUIModule } from '../../shared/snui/snui.module'
import { YourApplicationRoutingModule, routedComponents } from './your-profile-routing.module'
import { HeaderComponent } from './header/header.component'
import { RowQuestComponent } from './row-quest/row-quest.component'
import { SectionQuestsOpenComponent } from './section-quests-open/section-quests-open.component'
import { SectionBadgesComponent } from './section-badges/section-badges.component'
import { TileBadgeComponent } from './tile-badge/tile-badge.component'
import { RowMemberHistoryComponent } from './row-member-history/row-member-history.component'
import { SectionMemberHistoryComponent } from './section-member-history/section-member-history.component'

@NgModule({
  declarations: [
    ...routedComponents,
    HeaderComponent,
    RowQuestComponent,
    SectionQuestsOpenComponent,
    SectionBadgesComponent,
    TileBadgeComponent,
    RowMemberHistoryComponent,
    SectionMemberHistoryComponent,
  ],
  imports: [
    CommonModule,
    SNUIModule,
    YourApplicationRoutingModule,
  ],
  providers: [],
})
export class YourProfileModule { }

