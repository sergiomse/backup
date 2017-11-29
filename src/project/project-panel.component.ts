import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {Router} from "@angular/router";
import {Project} from "../models/project.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataService} from "../services/data.service";

@Component({
    selector: 'project-panel',
    templateUrl: 'project/project-panel.component.html',
    styleUrls: ['project/project-panel.component.css'],
    providers: []
})
export class ProjectPanelComponent implements OnInit {

    projects: BehaviorSubject<Array<Project>>;

    constructor(private _persistence: PersistenceService,
                private _router: Router,
                private _data: DataService) {
    }

    ngOnInit(): void {
        this.projects = this._persistence.projects;
    }

    addProject(): void {
        this.selected = -1;
        this._router.navigate(['/rerouting/%2Fnew-project']);
    }

    selectProject(index: number) {
        if (index != this.selected) {
            let url = encodeURIComponent('/project-details/' + index);
            this._router.navigate(['/rerouting/' + url])
                .then(completed => {
                    if (completed) {
                        this.selected = index;
                    }
                });
        }
    }

    set selected(index: number) {
        this._data.setSelectedProject(index);
    }

    get selected(): number {
        return this._data.getSelectedProject().getValue();
    }

    isRunning(index: number, projects: number[]) {
        let isRunning = false;
        projects.forEach(i => {
            if (index == i) isRunning = true;
        });
        return isRunning;
    }
}
