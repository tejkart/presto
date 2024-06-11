//@flow

export type TaskStatus = {
    self: string;
    state: string;
}

export type TaskStats = {
    createTime: string;
    elapsedTimeInNanos: number;
    totalCpuTimeInNanos: number;
    fullyBlocked: boolean;
    queuedDrivers: number;
    runningDrivers: number;
    blockedDrivers: number;
    totalDrivers: number;
    completedDrivers: number;
    rawInputPositions: number;
    rawInputDataSizeInBytes: number;
    totalScheduledTimeInNanos: number;
}

export type TaskOutputBuffers = {
    type: string;
    state: string;
    totalBufferedBytes: number;
}

export type Task = {
    taskId: string;
    taskStatus: TaskStatus;
    stats: TaskStats;
    nodeId: string;
    outputBuffers: TaskOutputBuffers;
}

export type RuntimeStat = {
    name: string;
    unit: string;
    sum: number;
    count: number;
    max: number;
    min: number;
}

export type RuntimeStats = {
    [key: string]: RuntimeStat;
}

export type OutputStage = {
    stageId: string;
    self: string;
    plan?: mixed;
    latestAttemptExecutionInfo: StageExecutionInfo;
    previousAttemptsExecutionInfos: StageExecutionInfo[];
    subStages: OutputStage[];
    isRuntimeOptimized: boolean;
}

export type StageExecutionInfo = {
    state: string;
    stats: QueryStats;
    tasks: Task[];
    failureCause?: string;
}

export type QueryStats = {
    totalScheduledTime: string;
    totalBlockedTime: string;
    totalCpuTime: string;
    cumulativeUserMemory: number;
    cumulativeTotalMemory: number;
    userMemoryReservation: string;
    peakUserMemoryReservation: string;
    runtimeStats: RuntimeStats;
    elapsedTime: string;
    createTime: string;
    endTime: string;
    waitingForPrerequisitesTime: string;
    queuedTime: string;
    totalPlanningTime: string;
    executionTime: string;
    processedInputPositions: number;
    processedInputDataSize: string;
    rawInputPositions: number;
    rawInputDataSize: string;
    shuffledPositions: number;
    shuffledDataSize: string;
    peakTotalMemoryReservation: string;
    outputPositions: number;
    outputDataSize: string;
    writtenOutputPositions: number;
    writtenOutputLogicalDataSize: string;
    writtenOutputPhysicalDataSize: string;
    spilledDataSize: string;
}

export type FailureInfo = {
    type: string;
    message: string;
    cause?: FailureInfo;
    suppressed: FailureInfo[];
    stack: string[];
    errorCode?: string;
    errorCause?: string;
}

export type ResourceEstimates = {
    executionTime?: string;
    cpuTime?: string;
    peakMemory?: string;
    peakTaskMemory?: string;
}

export type SessionRepresentation = {
    systemProperties: { [key: string]: string };
    catalogProperties: { [key: string]: { [key: string]: string } };
    resourceEstimates: ResourceEstimates;
    user: string;
    principal?: string;
    source?: string;
    catalog?: string;
    schema?: string;
    traceToken?: string;
    timeZoneKey: number;
    locale: string;
    remoteUserAddress?: string;
    userAgent?: string;
    clientInfo?: string;
    clientTags: string[];
    startTime: number;
}

export type PrestoWarning = {
    warningCode: { code: string, name: string };
    message: string;
}

export type ErrorCode = {
    code: number;
    name: string;
    type: string;
    retriable: boolean;
}

export type QueryData = {
    outputStage: OutputStage;
    queryId: string;
    session: SessionRepresentation;
    preparedQuery?: string;
    warnings: PrestoWarning[];
    queryStats: QueryStats;
    failureInfo: FailureInfo;
    errorType: string;
    errorCode: ErrorCode;
    resourceGroupId?: string[];
    self: string;
    memoryPool: string;
    query: string;
}

export type TaskFilter = {
    text: string;
    predicate: (string) => boolean;
}

export type HostToPortNumber = {
    [key: string]: string;
}