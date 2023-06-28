import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/conocimientos', pathMatch: 'full' },
  {
    path: 'conocimientos',
    loadChildren: () =>
      import('./modules/knowledge/knowledge.module').then(
        (m) => m.KnowledgeModule
      )
  },
  {
    path: 'autenticarse',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
