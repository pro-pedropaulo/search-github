import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:username', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
