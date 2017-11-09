import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {remote} from "electron";

@Component({
    selector: 'bk-ribbon',
    templateUrl: 'ribbon.component.html',
    styleUrls: ['ribbon.component.css']
})
export class RibbonComponent {

    constructor(private _router: Router) {}

    newProject() {
        this._router.navigate(['/new-project']);
    }

    about() {
        let mainWindow = remote.getCurrentWindow();
        remote.dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: `About Backup Utility`,
                message: `Aplicación para hacer backups de directorios.\n© Sergio Milla`,
                buttons: ['Ok']
            });
    }
}
