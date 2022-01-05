interface CreateTaskRequest {
    name: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    userIds: string[];
}

interface CreateTaskResponse {
    id: string;
    name: string;
}

interface GetScheduleRequest {
    from?: Date;
    until: Date;
}

interface GetScheduleResponse {
    currentDate: Date;
    taskInstances: TaskSchedule;
    
}
interface TaskSchedule {
    [taskId: string]: TaskInstanceInfo[];
}