import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'empty-panel',
    template: `
        <div class="bk-empty-projects">
            <img [src]="imgUrl" width="128px" height="128px">
            <div class="bk-text">{{message}}</div>
        </div>`,
    styles: [`
        .bk-empty-projects {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }

        .bk-text {
            font-size: 2em;
            margin-top: 30px;
            color: #8e8e8e;
        }`]
})
export class MessagePanelComponent implements OnInit {
    imgUrl: string = "";
    message: string = "";

    constructor(private _route: ActivatedRoute) {}


    ngOnInit(): void {
        console.log('ngOnInit message panel');
        let img = decodeURIComponent(this._route.snapshot.params['img']);
        console.log(`img = ${img}`);
        this.imgUrl = decodeURIComponent(this._route.snapshot.params['img']);
        this.message = decodeURIComponent(this._route.snapshot.params['msg']);
    }
}
