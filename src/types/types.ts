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

export type EmployeeScheduleType = {
    id: number
    name: string
    schedules: ScheduleType[]
}

export type CalendarEvent = {
    id: string
    startAt: string
    endAt: string
    timezoneStartAt?: string // optional
    summary: string
    color: string
    [key: string]: any
}

export type UserState = {
    userData: object
    setUserData: (userData: object) => void
}
