import client from "../helpers/authorized-api-client"

export class TaskService {
    getFlatTasks = (flatId: string) => client.get<TaskInfo[]>(`/flats/${flatId}/tasks`);
    createFlatTask = (flatId: string, body: CreateTaskRequest) => client.put<TaskInfo>(`/flats/${flatId}/tasks`, body);
    getFlatSchedule = (flatId: string, body: GetScheduleRequest) => client.post<GetScheduleResponse>(`/flats/${flatId}/tasks-schedule`, body); 
};

export default new TaskService();