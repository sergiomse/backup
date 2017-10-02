import {Injectable} from "@angular/core";

@Injectable()
export class PersistenceService {

    private PROJECTS_ITEM = "projects";

    getAllProjects(): string[] {
        let projectsStr = localStorage.getItem(this.PROJECTS_ITEM);
        let projects;
        if (projectsStr == null) {
            projects = [];
        } else {
            projects = JSON.parse(projectsStr);
        }

        return projects;
    }

    insertProject(name: string): void {
        let projects = this.getAllProjects();
        projects.push(name);
        localStorage.setItem(this.PROJECTS_ITEM, JSON.stringify(projects));
    }

}