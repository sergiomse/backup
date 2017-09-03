import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bk-split',
    templateUrl: 'split.component.html',
    styleUrls: ['split.component.css']
})
export class SplitComponent implements OnInit {

    @Input()
    initialWidth: number = 200;
    @Input()
    minWidth: number = 100;
    @Input()
    maxWidth: number = 400;

    private isDragging: boolean = false;
    private width: number;

    ngOnInit(): void {
        console.log("this.minWidth = " + this.minWidth);
        this.setWidth(this.initialWidth);
    }

    startDrag(e: MouseEvent): void {
        if (e.button === 0) {
            this.isDragging = true;
        }
    }

    move(e: MouseEvent): void {
        if (this.isDragging) {
            this.setWidth(e.clientX);
        }
    }

    private setWidth(x: number) {
        if (x < this.minWidth) x = this.minWidth;
        if (x > this.maxWidth) x = this.maxWidth;
        this.width = x;
    }

    stopDrag(e: MouseEvent): void {
        if (e.button === 0) {
            this.isDragging = false;
        }
    }
}
