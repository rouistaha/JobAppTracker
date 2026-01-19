import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPage } from './Components/Pages/info-page/info-page';
import { JobsApplications } from './Components/Pages/jobs-applications/jobs-applications';
import { Stats } from './Components/Pages/stats/stats';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsApplications },
  { path: 'stats', component: Stats },
  { path: 'info', component: InfoPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
