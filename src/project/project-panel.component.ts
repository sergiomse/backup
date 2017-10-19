import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {Router} from "@angular/router";
import {Project} from "../models/project.model";

@Component({
    selector: 'project-panel',
    templateUrl: 'project/project-panel.component.html',
    styleUrls: ['project/project-panel.component.css'],
    providers: []
})
export class ProjectPanelComponent implements OnInit {

    projects: Project[];

    constructor(private _persistence: PersistenceService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.projects = this._persistence.getAllProjects();
        this._persistence.subscribe(() => {
            console.log('Subscriber called');
            this.projects = this._persistence.getAllProjects()
        });
        // let projects = this._persistence.getAllProjects();
        // this.projects = projects.map(p => p.name);
    }

    addProject(): void {
        this._router.navigate(['/new-project']);
    }
}
