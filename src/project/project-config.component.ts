import {Component, OnInit} from '@angular/core';
import {PersistenceService} from "../services/persistence.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Project} from "../models/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {remote} from 'electron';
import {ErrorStateMatcher} from "@angular/material";
import * as fs from "fs";
import {CanComponentDeactivate} from "../guards/can-deactivate-guard";
import {Observable} from "rxjs/Observable";


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'project-config',
    templateUrl: 'project/project-config.component.html',
    styleUrls: ['project/project-config.component.css'],
    providers: []
})
export class ProjectConfigComponent implements OnInit, CanComponentDeactivate {
    indexProjectSelected: number;
    nameFormGroup: FormGroup;
    configureFormGroup: FormGroup;
    patterns: string[] = [];
    selected = -1;
    isSaving = false;

    matcher = new MyErrorStateMatcher();

    constructor(private _persistence: PersistenceService,
                private _formBuilder: FormBuilder,
                private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.indexProjectSelected = this._route.snapshot.params['index'];
        console.log(`indexProjectSelected = ${this.indexProjectSelected}`);
        this.nameFormGroup = this._formBuilder.group({
            nameCtrl: ['', Validators.required]
        });
        this.configureFormGroup = this._formBuilder.group({
            sourceFolderCtrl: ['', [Validators.required, ProjectConfigComponent.folderValidator]],
            destinationFolderCtrl: ['', [Validators.required, ProjectConfigComponent.folderValidator]],
            patternCtrl: ''
        });

        if (this.indexProjectSelected) {
            this.populateForms();
        }
    }

    private populateForms() {
        let project = this._persistence.getProject(this.indexProjectSelected);
        this.nameFormGroup.get('nameCtrl').setValue(project.name);
        this.configureFormGroup.get('sourceFolderCtrl').setValue(project.sourceFolder);
        this.configureFormGroup.get('destinationFolderCtrl').setValue(project.destinationFolder);
        this.patterns = project.patterns;
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
            this.configureFormGroup.controls.patternCtrl.setValue('');
        } catch (e) {
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

    save() {
        let project = new Project();
        project.name = this.nameFormGroup.controls.nameCtrl.value;
        project.sourceFolder = this.configureFormGroup.get('sourceFolderCtrl').value;
        project.destinationFolder = this.configureFormGroup.get('destinationFolderCtrl').value;
        console.log(`patterns = ${this.patterns}`);
        project.patterns = this.patterns;
        if (this.indexProjectSelected) {
            this._persistence.updateProject(project, this.indexProjectSelected);
        } else {
            this._persistence.insertProject(project);
        }
        this.isSaving = true;
        this._router.navigate(['/message/..%2Fimages%2Fic_ok.png/Project%20saved%20correctly.'])
    }

    openDirectoryDialog(controlName: string) {
        let mainWindow = remote.getCurrentWindow();
        remote.dialog.showOpenDialog(mainWindow, {
                properties: ['openDirectory']
            },
            paths => {
                if (paths && paths.length > 0) {
                    this.configureFormGroup.get(controlName).setValue(paths[0]);
                }
            });
    }

    modifyPattern(index: number, value: string) {
        this.patterns[index] = value;
    }

    static folderValidator(control: FormControl) {
        let folder = control.value;
        if (!fs.existsSync(folder)) {
            return {folder: 'Folder doesn\'t exists'};
        }
        let stats = fs.statSync(folder);
        if (!stats.isDirectory()) {
            return {folder: 'Folder is not a directory'};
        }
        return null;
    }

    canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.isSaving) {
            return true;
        }

        let isDirty = this.nameFormGroup.controls.nameCtrl.dirty ||
            this.configureFormGroup.controls.sourceFolderCtrl.dirty ||
            this.configureFormGroup.controls.destinationFolderCtrl.dirty;
        if (!isDirty) {
            return true;
        }

        return new Promise<boolean>((resolve, reject) => {
            let mainWindow = remote.getCurrentWindow();
            remote.dialog.showMessageBox(mainWindow, {
                    type: 'warning',
                    title: `Cambios no guardados`,
                    message: `Los cambios no han sido guardados. ¿Quiere desecharlos?`,
                    buttons: ['Sí', 'No']
                },
                response => {
                    console.log(`Button clicked ${response}`);
                    if (response == 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
        });

    }
}
