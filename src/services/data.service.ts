import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {
    private selectedProjectIndex = new BehaviorSubject<number>(-1);
    private runningProjects = new BehaviorSubject<Array<number>>([]);

    setSelectedProject(index: number) {
        this.selectedProjectIndex.next(index);
    }

    getSelectedProject(): BehaviorSubject<number> {
        return this.selectedProjectIndex;
    }

    setRunningProject(index: number) {
        let value = this.runningProjects.getValue();
        value.push(index);
        this.runningProjects.next(value);
    }

    removeRunningProject(index: number) {
        let value = this.runningProjects.getValue();
        value.splice(index, 1);
        this.runningProjects.next(value);
    }

    getRunningProjects(): BehaviorSubject<Array<number>> {
        return this.runningProjects;
    }
}