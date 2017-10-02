import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";

@Component({
    selector: 'project-config',
    templateUrl: 'project/project-config.component.html',
    styleUrls: ['project/project-config.component.css'],
    providers: [PersistenceService]
})
export class ProjectConfigComponent implements OnInit {

    constructor(private persistence: PersistenceService) {}

    ngOnInit(): void {
        console.log('component initialized');
    }

    isEmpty(): boolean {
        return this.persistence.getAllProjects().length == 0;
    }
}
