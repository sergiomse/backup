import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";

@Injectable()
export class PersistenceService {

    private subscribers: Function[];
    private PROJECTS_ITEM = "projects";

    // projectsObservable: Observable<[Project]> = Observable.create(observer => {
    //     console.log(`observer ${observer}`);
    //     observer.next(this.getAllProjects());
    // });


    constructor() {
        console.log('PersistenceService Created once');
        this.subscribers = [];
    }

    subscribe(callback: Function) {
        this.subscribers.push(callback);
    }

    notify() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i]();
        }
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
        this.notify();
    }

}