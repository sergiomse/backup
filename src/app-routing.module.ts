import {RouterModule, Routes} from '@angular/router';
import {ProjectConfigComponent} from "./project/project-config.component";
import {NgModule} from "@angular/core";
import {MessagePanelComponent} from "./project/message-panel.component";
import {ProjectDetailsComponent} from "./project/project-details.component";
import {ReroutingComponent} from "./ReroutingComponent";

const appRoutes: Routes = [
    {path: '', redirectTo: '/message/..%2Fimages%2Fic_floppy_disk.png/Create%20or%20select%20any%20project%20to%20start.', pathMatch: 'full'},
    {path: 'message/:img/:msg', component: MessagePanelComponent},
    {path: 'new-project', component: ProjectConfigComponent},
    {path: 'edit-project/:index', component: ProjectConfigComponent},
    {path: 'project-details/:index', component: ProjectDetailsComponent},
    {path: 'rerouting/:url', component: ReroutingComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}