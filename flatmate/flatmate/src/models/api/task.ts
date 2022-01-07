interface CreateTaskRequest {
    name: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    userIds: string[];
    repeatAfter?: number;
    timeToComplete?: number;
}

interface GetScheduleRequest {
    from?: string;
    until: string;
}

interface GetScheduleResponse {
    currentDate: string;
    taskInstances: TaskSchedule;
    
}
interface TaskSchedule {
    [taskId: string]: TaskInstanceInfo[];
}