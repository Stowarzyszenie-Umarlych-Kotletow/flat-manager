enum TaskState {
    SCHEDULED = "SCHEDULED",
    PAST = "PAST", 
    FUTURE = "FUTURE"
}

interface TaskInstanceInfo {
    id: string;
    userId?: string;
    completedByUserId?: string;
    state: TaskState;
    date: string;
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