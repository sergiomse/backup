import {RouterModule, Routes} from '@angular/router';
import {ProjectConfigComponent} from "./project/project-config.component";
import {NgModule} from "@angular/core";
import {MessagePanelComponent} from "./project/message-panel.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/message/..%2Fimages%2Fic_floppy_disk.png/Create%20or%20select%20any%20project%20to%20start.', pathMatch: 'full'},
    {path: 'message/:img/:msg', component: MessagePanelComponent},
    {path: 'new-project', component: ProjectConfigComponent}
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