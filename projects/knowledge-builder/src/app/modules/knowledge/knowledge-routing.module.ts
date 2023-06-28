import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { IntentComponent } from './intent/intent.component';
import { getRouteChildren } from '../../shared/helpers/router-children.helper';
import { IntentEditComponent } from './intent/intent-edit/intent-edit.component';
import { IntentDetailComponent } from './intent/intent-detail/intent-detail.component';
import { EntityDetailComponent } from './entity/entity-detail/entity-detail.component';
import { EntityEditComponent } from './entity/entity-edit/entity-edit.component';
import { EntityComponent } from './entity/entity.component';
import { ResponseComponent } from './response/response.component';
import { ResponseDetailComponent } from './response/response-detail/response-detail.component';
import { ResponseEditComponent } from './response/response-edit/response-edit.component';
import { StoryComponent } from './story/story.component';
import { StoryDetailComponent } from './story/story-detail/story-detail.component';
import { StoryEditComponent } from './story/story-edit/story-edit.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { NgModule } from '@angular/core';
import { KnowledgeComponent } from './knowledge.component';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeComponent,
    canActivate: [authGuard],
    data: { breadcrumb: { alias: 'knowledge' } },
    children: [
      {
        path: 'propositos',
        component: IntentComponent,
        data: { breadcrumb: { alias: 'intent' } },
        children: getRouteChildren('intent', {
          componentDetailType: IntentDetailComponent,
          componentEditType: IntentEditComponent
        })
      },
      {
        path: 'sustantivos',
        component: EntityComponent,
        data: { breadcrumb: { alias: 'entity' } },
        children: getRouteChildren('entity', {
          componentDetailType: EntityDetailComponent,
          componentEditType: EntityEditComponent
        })
      },
      {
        path: 'respuestas',
        component: ResponseComponent,
        data: { breadcrumb: { alias: 'response' } },
        children: getRouteChildren('response', {
          componentDetailType: ResponseDetailComponent,
          componentEditType: ResponseEditComponent
        })
      },
      {
        path: 'dialogos',
        component: StoryComponent,
        data: { breadcrumb: { alias: 'story' } },
        children: getRouteChildren('story', {
          componentDetailType: StoryDetailComponent,
          componentEditType: StoryEditComponent
        })
      },
      {
        path: 'documentos',
        component: DocumentComponent,
        data: { breadcrumb: { alias: 'document' } },
        children: getRouteChildren('document', {
          componentDetailType: DocumentDetailComponent,
          componentEditType: DocumentEditComponent
        })
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeRoutingModule {}
