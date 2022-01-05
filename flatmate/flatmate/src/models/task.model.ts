enum TaskState {
    SCHEDULED, PAST, FUTURE
}

interface TaskInfo {
    id: string;
    name: string;
}

interface TaskInstanceInfo {
    id: string;
    userId?: string;
    state: TaskState;
    date: Date;
}

interface Task extends TaskInfo {
    flatId: string;
    description?: string;
    ownerId: string;
    startDate: Date;
    endDate?: Date;
    timeToComplete: number;
    repeatEvery?: number;
}