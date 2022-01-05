enum TaskState {
    SCHEDULED, PAST, FUTURE
}

interface TaskInstanceInfo {
    id: string;
    userId?: string;
    state: TaskState;
    date: Date;
}

interface Task {
    id: string;
    name: string;
    flatId: string;
    description?: string;
    ownerId: string;
    startDate: Date;
    endDate?: Date;
    timeToComplete: number;
    repeatEvery?: number;
}