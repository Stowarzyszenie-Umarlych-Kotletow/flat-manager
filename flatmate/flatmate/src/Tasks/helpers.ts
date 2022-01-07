import { asDate } from "../helpers/date-helper";
import TaskEvent from "./event.model";

export function scheduleToEvents(schedule: TaskSchedule,
     taskNameResolver: (taskId: string) => string): TaskEvent[] {
    if (!schedule) {
        return [];
    }
    const events = [];

    for (let [taskId, taskInstances] of Object.entries(schedule)) {
        Object.values(taskInstances).map(instance => {
            const name = taskNameResolver(taskId);
            console.log(instance);
            events.push({
                title: name,
                taskId: taskId,
                instance: instance,
                isCompleted: !!instance.completedByUserId,
                state: instance.state,
                start: asDate(instance.date),
                end: asDate(instance.date),
            });
        });
    }
    return events;
};