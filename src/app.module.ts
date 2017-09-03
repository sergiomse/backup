import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {TitleComponent} from "./title.component";
import {RibbonComponent} from "./ribbon.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientModule} from "@angular/common/http";
import {SplitComponent} from "./split.component";

@NgModule({
    imports: [BrowserModule, InlineSVGModule, HttpClientModule],
    declarations: [AppComponent, TitleComponent, RibbonComponent, SplitComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}