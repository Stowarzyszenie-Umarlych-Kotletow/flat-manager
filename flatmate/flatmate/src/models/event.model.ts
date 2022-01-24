import {TaskFrontendState, TaskInstanceInfo, TaskState} from "./task.model";

type TaskEvent = {
    title: string,
    taskId: string,
    instance: TaskInstanceInfo,
    start: Date,
    frontendState: TaskFrontendState
    isCompleted: boolean,
    state: TaskState
    end: Date,
};

export default TaskEvent;