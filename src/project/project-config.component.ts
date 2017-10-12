import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'project-config',
    templateUrl: 'project/project-config.component.html',
    styleUrls: ['project/project-config.component.css'],
    providers: [PersistenceService]
})
export class ProjectConfigComponent implements OnInit {
    nameFormGroup: FormGroup;
    configureFormGroup: FormGroup;
    patterns = [];
    selected = -1;
    isEditMode = false;
    fistButtonText = 'Add';

    constructor(private persistence: PersistenceService,
                private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.nameFormGroup = this._formBuilder.group({
            nameCtrl: ['', Validators.required]
        });
        this.configureFormGroup = this._formBuilder.group({
            sourceFolderCtrl: ['', Validators.required],
            destinationFolderCtrl: ['', Validators.required],
            patternCtrl: ['']
        });
    }

    isEmpty(): boolean {
        return this.persistence.getAllProjects().length == 0;
    }

    addPattern() {
        let patternCtrl = this.configureFormGroup.get('patternCtrl');
        let pattern = patternCtrl != null ? patternCtrl.value : '';

        if (pattern.trim() == '') {
            this.showError('Pattern cannot be empty');
            return;
        }

        try {
            this.patterns.push(pattern);
            patternCtrl.setValue('');
        } catch(e) {
            this.showError(e);
            return;
        }
    }

    showError(error: string) {
        console.log(error);
    }

    selectItem(index: number) {
        console.log(`selected ${index}`);
        this.selected = index;
    }

    delete(i: number) {
        this.patterns.splice(i, 1);
    }
}
