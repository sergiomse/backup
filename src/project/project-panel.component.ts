import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";

@Component({
    selector: 'project-panel',
    templateUrl: 'project/project-panel.component.html',
    styleUrls: ['project/project-panel.component.css'],
    providers: [PersistenceService]
})
export class ProjectPanelComponent implements OnInit {

    projects: string[] = [];

    constructor(private persistence: PersistenceService) {
    }

    ngOnInit(): void {
        this.projects = this.persistence.getAllProjects();
    }

    addProject(): void {
        this.persistence.insertProject('Hola');
        this.projects.push('Hola');
    }
}
