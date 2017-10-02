import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {TitleComponent} from "./title.component";
import {RibbonComponent} from "./ribbon.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientModule} from "@angular/common/http";
import {SplitComponent} from "./split.component";
import {MatButtonModule, MatInputModule, MatRippleModule, MatStepperModule} from "@angular/material";
import {ProjectPanelComponent} from "./project/project-panel.component";
import {ProjectConfigComponent} from "./project/project-config.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule,
        InlineSVGModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatRippleModule,
        MatButtonModule,
        MatStepperModule,
        MatInputModule
    ],
    declarations: [
        AppComponent,
        TitleComponent,
        RibbonComponent,
        SplitComponent,
        ProjectPanelComponent,
        ProjectConfigComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}