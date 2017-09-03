import {Component, OnInit} from '@angular/core';
import {remote} from 'electron';
import BrowserWindow = Electron.BrowserWindow;

@Component({
    selector: 'bk-title',
    templateUrl: 'title.component.html',
    styleUrls: ['title.component.css']
})
export class TitleComponent implements OnInit {

    // private isDragging: boolean = false;
    // private difPos = {x: 0, y:0};
    private window: BrowserWindow;

    ngOnInit(): void {
        this.window = remote.getCurrentWindow();
    }

    minimize(): void {
        this.window.minimize();
    }

    maximize(): void {
        if (this.window.isMaximized()) {
            this.window.unmaximize();
        } else {
            this.window.maximize();
        }
    }

    close(): void {
        this.window.close();
    }

    // startDrag(e: MouseEvent): void {
    //     console.log(e);
    //     if (e.button === 0) {
    //         this.isDragging = true;
    //         let winPos = this.window.getPosition();
    //         this.difPos.x = winPos[0] - e.screenX;
    //         this.difPos.y = winPos[1] - e.screenY;
    //     }
    // }
    //
    // drag(e: MouseEvent): void {
    //     if (this.isDragging) {
    //         this.window.setPosition(e.screenX + this.difPos.x, e.screenY + this.difPos.y);
    //     }
    // }
    //
    // stopDrag(e: MouseEvent): void {
    //     if (e.button === 0) {
    //         this.isDragging = false;
    //     }
    // }
}
