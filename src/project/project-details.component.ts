import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersistenceService} from "../services/persistence.service";
import {Project} from "../models/project.model";
import {remote} from 'electron';
import {DataService} from "../services/data.service";

@Component({
    selector: 'project-details',
    templateUrl: 'project/project-details.component.html',
    styleUrls: ['project/project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

    indexProjectSelected: number;
    project: Project;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _persistence: PersistenceService,
                private _data: DataService) {}

    ngOnInit(): void {
        this.indexProjectSelected = this._route.snapshot.params['index'];
        this.project = this._persistence.getProject(this.indexProjectSelected);
    }

    edit() {
        this._router.navigate([`/edit-project/${this.indexProjectSelected}`]);
    }

    delete() {
        let mainWindow = remote.getCurrentWindow();
        remote.dialog.showMessageBox(mainWindow, {
                type: 'warning',
                title: `Delete project ${this.project.name}`,
                message: `Are you sure you want to delete project ${this.project.name}. This operation cannot be undo.`,
                buttons: ['Delete', 'Cancel']
            },
            response => {
                console.log(`Button clicked ${response}`);
                if (response == 0) {
                    this._persistence.deleteProject(this.indexProjectSelected);
                    this._data.setSelectedProject(-1);
                    this._router.navigate(['/message/..%2Fimages%2Fic_ok.png/Project%20deleted%20correctly.']);
                }
            });
    }

    isDisabled(runningProjects: Array<number>) {
        let isRunning = false;
        runningProjects.forEach(i => {
            if (this.indexProjectSelected == i) isRunning = true;
        });
        return isRunning;
    }
}
