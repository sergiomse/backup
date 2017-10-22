import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class PersistenceService {

    private PROJECTS_ITEM = "projects";
    projects: BehaviorSubject<Array<Project>>;

    constructor() {
        console.log('PersistenceService Created once');
        // this.subscribers = [];
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

    insertProject(project: Project): void {
        let projects = this.getAllProjects();
        projects.push(project);
        localStorage.setItem(this.PROJECTS_ITEM, JSON.stringify(projects));
        // this.notify();
        this.projects.next(projects);
    }

}