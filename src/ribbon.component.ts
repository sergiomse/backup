import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {remote} from "electron";
import {DataService} from "./services/data.service";
import {PersistenceService} from "./services/persistence.service";
import * as path from "path";
import * as fs from "fs";
import * as fse from 'fs-extra';

@Component({
    selector: 'bk-ribbon',
    templateUrl: 'ribbon.component.html',
    styleUrls: ['ribbon.component.css']
})
export class RibbonComponent {

    constructor(private _router: Router,
                private _data: DataService,
                private _persistence: PersistenceService) {
    }

    newProject() {
        this._router.navigate(['/new-project']);
    }

    about() {
        let mainWindow = remote.getCurrentWindow();
        remote.dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'About Backup Utility',
            message: 'Aplicación para hacer backups de directorios.\n© Sergio Milla',
            buttons: ['Ok']
        });
    }

    runSelected() {
        console.log('Run selected');
        let index = this._data.getSelectedProject().getValue();
        this._data.setRunningProject(index);
        if (index != -1) {
            let project = this._persistence.getProject(index);

            let source = project.sourceFolder;
            if (!fs.lstatSync(source).isDirectory()) {
                // TODO add a message box
                console.log(`Destination folder "${source}" is not a folder`);
                this._data.removeRunningProject(index);
                return;
            }
            let dest = project.destinationFolder;
            if (!fs.lstatSync(dest).isDirectory()) {
                // TODO add a message box
                console.log(`Destination folder "${dest}" is not a folder`);
                this._data.removeRunningProject(index);
                return;
            }

            let sourceDirFields = source.split(/[\\/]/g);
            let rootProjectDir = sourceDirFields[sourceDirFields.length - 1];
            let compiledRegexp = project.patterns.map(p => new RegExp(p, 'g'));

            fse.copy(source,
                path.join(dest, rootProjectDir + '_' + this.getFormattedDate()),
                {
                    filter: (s: string, d: string) => {
                        console.log(`src = ${s}, dest = ${d}`);
                        for (let i = 0; i < compiledRegexp.length; i++) {
                            if (compiledRegexp[i].test(s)) {
                                return false;
                            }
                        }
                        return true;
                    }
                }).catch(err => {
                    console.log(err);
                }).then(() => {
                    this._data.removeRunningProject(index);
                });
        }
    }

    private getFormattedDate(): string {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
            month = '0' + month;
        }
        let day = date.getDate().toString();
        if (day.length === 0) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }
}
