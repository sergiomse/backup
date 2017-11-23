import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'rerouting',
    template: ''
})
export class ReroutingComponent implements OnInit {

    constructor(private _router: Router,
                private _route: ActivatedRoute) {}

    ngOnInit(): void {
        let url = this._route.snapshot.params['url'];
        url = decodeURIComponent(url);
        this._router.navigate([url]);
    }
}
