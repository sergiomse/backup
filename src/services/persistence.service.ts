import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";

@Injectable()
export class PersistenceService {

    private PROJECTS_ITEM = "projects";
    projects: BehaviorSubject<Array<Project>>;

    constructor() {
        this.projects = new BehaviorSubject<Array<Project>>(this.getAllProjects());
    }

    getAllProjects(): Project[] {
        let projectsStr = localStorage.getItem(this.PROJECTS_ITEM);
        let projects;
        if (projectsStr == null) {
            projects = [];
        } else {
            projects = JSON.parse(projectsStr);
        }

        return projects;
    }

    getProject(index: number): Project {
        return this.getAllProjects()[index];
    }

    saveProjects(projects: Project[]) {
        localStorage.setItem(this.PROJECTS_ITEM, JSON.stringify(projects));
    }

    insertProject(project: Project): void {
        let projects = this.getAllProjects();
        projects.push(project);
        this.saveProjects(projects);
        this.projects.next(projects);
    }

    deleteProject(index: number) {
        let projects = this.getAllProjects();
        projects.splice(index, 1);
        this.saveProjects(projects);
        this.projects.next(projects);
    }
}