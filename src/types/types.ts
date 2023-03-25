export type UserLoaderDataType = {
    id: number
    name: string
    position: string
    manager: number
    contract: string
}

export type ScheduleType = {
    id: number
    idEmployee: number
    start: string
    end: string
    status: string
    employeeComment: string | null
    managerComment: string | null
    antecipateSalary: boolean
    createdAt: string
    updatedAt: string
}
