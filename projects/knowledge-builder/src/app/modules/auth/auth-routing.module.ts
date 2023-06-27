import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loggedInAuthGuard } from '../../core/guards/logged-in-auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [loggedInAuthGuard] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
