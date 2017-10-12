import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {Router} from "@angular/router";

@Component({
    selector: 'project-panel',
    templateUrl: 'project/project-panel.component.html',
    styleUrls: ['project/project-panel.component.css'],
    providers: [PersistenceService]
})
export class ProjectPanelComponent implements OnInit {

    projectsNames: string[] = [];

    constructor(private _persistence: PersistenceService,
                private _router: Router) {
    }

    ngOnInit(): void {
        let projects = this._persistence.getAllProjects();
        this.projectsNames = projects.map(p => p.name);
    }

    addProject(): void {
        this._router.navigate(['/new-project']);
    }
}
