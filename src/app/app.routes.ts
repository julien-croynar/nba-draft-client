import { Routes } from '@angular/router';
import {
  DraftProtectionPage
} from './features/protection/draft-protection-page.component/draft-protection-page.component';
import {DraftSelectionPage} from './features/selection/draft-selection-page.component/draft-selection-page.component';
import {HomePage} from './features/home/home-page.component/home-page.component';
import {SummaryPage} from './features/summary/summary-page.component/summary-page.component';

export const routes: Routes = [{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},{
  path:'home',
  component:HomePage,
  pathMatch:'full'
},{
  path:'protection',
  children:[{
    path:'',
    redirectTo:'ATL',
    pathMatch:'full'
  },{
    path:':teamCode',
    component:DraftProtectionPage
  }]
},{
  path:'selection',
  component:DraftSelectionPage
},{
  path:'summary',
  component:SummaryPage
},{
  path: '**',
  redirectTo: 'protection'}
];
