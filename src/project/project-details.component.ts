import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersistenceService} from "../services/persistence.service";
import {Project} from "../models/project.model";
import {remote} from 'electron';

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
                private _persistence: PersistenceService) {}

    ngOnInit(): void {
        this.indexProjectSelected = this._route.snapshot.params['index'];
        this.project = this._persistence.getProject(this.indexProjectSelected);
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
                    this._router.navigate(['/message/..%2Fimages%2Fic_ok.png/Project%20deleted%20correctly.']);
                }
            });
    }
}
