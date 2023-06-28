import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntentComponent } from './intent/intent.component';
import { EntityComponent } from './entity/entity.component';
import { ResponseComponent } from './response/response.component';
import { StoryComponent } from './story/story.component';
import { DocumentComponent } from './document/document.component';
import { IntentDetailComponent } from './intent/intent-detail/intent-detail.component';
import { IntentEditComponent } from './intent/intent-edit/intent-edit.component';
import { EntityDetailComponent } from './entity/entity-detail/entity-detail.component';
import { EntityEditComponent } from './entity/entity-edit/entity-edit.component';
import { ResponseDetailComponent } from './response/response-detail/response-detail.component';
import { ResponseEditComponent } from './response/response-edit/response-edit.component';
import { StoryDetailComponent } from './story/story-detail/story-detail.component';
import { StoryEditComponent } from './story/story-edit/story-edit.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    IntentComponent,
    EntityComponent,
    ResponseComponent,
    StoryComponent,
    DocumentComponent,
    IntentDetailComponent,
    IntentEditComponent,
    EntityDetailComponent,
    EntityEditComponent,
    ResponseDetailComponent,
    ResponseEditComponent,
    StoryDetailComponent,
    StoryEditComponent,
    DocumentDetailComponent,
    DocumentEditComponent
  ],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
