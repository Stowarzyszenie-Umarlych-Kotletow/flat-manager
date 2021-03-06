import {asDate} from "./date-helper";
import TaskEvent from "../models/event.model";
import {TaskFrontendState, TaskState} from "../models/task.model";

export function taskInstanceToFrontendState(taskInstance) {
    if (taskInstance.state == TaskState.PAST) { //PAST
        if (!!taskInstance.completedByUserId) {
            return TaskFrontendState.COMPLETED
        } else {
            return TaskFrontendState.FAILED
        }
    } else { //TODAY+FUTURE
        if (taskInstance.state == TaskState.SCHEDULED) {
            if (!!taskInstance.completedByUserId) {
                return TaskFrontendState.COMPLETED
            } else {
                return TaskFrontendState.PENDING
            }
        } else if (taskInstance.state == TaskState.FUTURE) {
            return TaskFrontendState.FUTURE
        }
    }
}

export function scheduleToEvents(schedule: TaskSchedule,
                                 taskNameResolver: (taskId: string) => string): TaskEvent[] {
    if (!schedule) {
        return [];
    }
    const events = [];

    for (let [taskId, taskInstances] of Object.entries(schedule)) {
        Object.values(taskInstances).forEach(instance => {
            const name = taskNameResolver(taskId);
            const frontendState = taskInstanceToFrontendState(instance);
            events.push({
                title: name,
                taskId: taskId,
                instance: instance,
                isCompleted: !!instance.completedByUserId,
                state: instance.state,
                frontendState: frontendState,
                start: asDate(instance.date),
                end: asDate(instance.date),
            });
        });
    }
    return events;
};

