import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'message-panel',
    template: `
        <div class="bk-message">
            <img [src]="imgUrl" width="128px" height="128px">
            <div class="bk-text">{{message}}</div>
        </div>`,
    styles: [`
        .bk-message {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            height: 100%;
            overflow: hidden;
        }

        .bk-text {
            font-size: 2em;
            text-align: center;
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
