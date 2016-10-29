import { Component } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../modules/Task';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})

export class TasksComponent {
    tasks:Task[];
    title:string;

    constructor(private taskService:TaskService) {
        this.taskService.getTasks()
            .subscribe(tasks => {
                console.log("Get Tasks: ", JSON.stringify(tasks, null, 2));
                this.tasks = tasks;
            });
    }

    addTask(event) {
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };

        this.taskService.addTask(newTask)
            .subscribe(tasks => {
                this.tasks.push(tasks);
                this.title = '';
                console.log("Add New Tasks ", JSON.stringify(this.tasks, null, 2));
            });
    }

    deleteTask(id, i) {
        //var tasks = this.tasks;

        this.taskService.deleteTask(id)
            .subscribe(data => {
                console.log("Deleted Data: ", data, id);
                this.tasks.splice(i, 1);
            });
    }
}
