import { TaskInstanceInfo, TaskState } from "../models/task.model";

type TaskEvent = {
    title: string,
    taskId: string,
    instance: TaskInstanceInfo,
    start: Date,
    isCompleted: boolean,
    state: TaskState
    end: Date,
};

export default TaskEvent;