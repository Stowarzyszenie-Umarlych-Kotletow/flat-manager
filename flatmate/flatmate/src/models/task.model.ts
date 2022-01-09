export enum TaskState {
    SCHEDULED = "SCHEDULED",
    PAST = "PAST", 
    FUTURE = "FUTURE"
}

export interface TaskInstanceInfo {
    id: string;
    userId?: string;
    completedByUserId?: string;
    state: TaskState;
    date: string;
}

export interface Task {
    id: string;
    name: string;
    flatId: string;
    description?: string;
    ownerId: string;
    startDate: Date;
    endDate?: Date;
    timeToComplete: number;
    repeatEvery?: number;
    userDoneCounter: UserDoneCounter;
}

export interface UserDoneCounter {
    [userId: string]: number;
}