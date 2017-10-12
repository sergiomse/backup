import {Injectable} from "@angular/core";
import {Project} from "../models/project.model";

@Injectable()
export class PersistenceService {

    private PROJECTS_ITEM = "projects";

    getAllProjects(): [Project] {
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
    }

}