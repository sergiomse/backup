import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'bk-ribbon',
    templateUrl: 'ribbon.component.html',
    styleUrls: ['ribbon.component.css']
})
export class RibbonComponent implements OnInit {

    ngOnInit(): void {
        console.log('component initialized');
    }

    newProject(): void {
        console.log('New project');
    }
}
