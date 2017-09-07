import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'project-panel',
    templateUrl: 'project-panel.component.html',
    styleUrls: ['project-panel.component.css']
})
export class ProjectPanelComponent implements OnInit {

    ngOnInit(): void {
        console.log('component initialized');
    }
}
