export interface SignInRequest {
    email: string
    password: string
}

export interface UserData {
    userGroup: number,
    token: string
}

export enum Status {
    Ok = 0,
    Error = 1
}

export interface SignInResponse {
    data: UserData
    status: Status
    error: string | null
}

export interface GreetingResponse {
    data: string
    status: Status,
    error: string | null
}

export enum MessageType {
    Ping = 0,
    LogOff = 1
}

export interface SocketMessage {
    date: Date
    messageType: MessageType
}