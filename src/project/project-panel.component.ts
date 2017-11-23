import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {Router} from "@angular/router";
import {Project} from "../models/project.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'project-panel',
    templateUrl: 'project/project-panel.component.html',
    styleUrls: ['project/project-panel.component.css'],
    providers: []
})
export class ProjectPanelComponent implements OnInit {

    projects: BehaviorSubject<Array<Project>>;

    constructor(private _persistence: PersistenceService,
                private _router: Router) {
    }

    ngOnInit(): void {
        this.projects = this._persistence.projects;
    }

    addProject(): void {
        this._router.navigate(['/rerouting/%2Fnew-project']);
    }

    selectProject(index: number) {
        let url = encodeURIComponent('/project-details/' + index);
        this._router.navigate(['/rerouting/' + url]);
    }
}
