import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {TitleComponent} from "./title.component";
import {RibbonComponent} from "./ribbon.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientModule} from "@angular/common/http";
import {SplitComponent} from "./split.component";
import {MatButtonModule, MatCardModule, MatInputModule, MatRippleModule, MatStepperModule} from "@angular/material";
import {ProjectPanelComponent} from "./project/project-panel.component";
import {ProjectConfigComponent} from "./project/project-config.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {MessagePanelComponent} from "./project/message-panel.component";
import {CommonModule} from "@angular/common";
import {PersistenceService} from "./services/persistence.service";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {ReroutingComponent} from "./ReroutingComponent";
import {CanDeactivateGuard} from "./guards/can-deactivate-guard";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        InlineSVGModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatButtonModule,
        MatStepperModule,
        MatInputModule,
        MatCardModule
    ],
    declarations: [
        AppComponent,
        TitleComponent,
        RibbonComponent,
        SplitComponent,
        MessagePanelComponent,
        ProjectPanelComponent,
        ProjectConfigComponent,
        ProjectDetailsComponent,
        ReroutingComponent
    ],
    providers: [
        PersistenceService,
        CanDeactivateGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}