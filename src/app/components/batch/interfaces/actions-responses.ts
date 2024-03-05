export interface actionGenericResponse {
    userAccountObjectId: string,
    state: string,
    numberOfItems: number,
    method: string,
    startDate: Date,
    endDate: Date,
    batchLogHeaderId: number,
}

export interface getBatchProcessUserLockResponse {
    userAccountObjectId: string,
    lockDate: Date,
}

export interface ipList {
    name: string,
    id: string,
    ipRanges: string[]
}
