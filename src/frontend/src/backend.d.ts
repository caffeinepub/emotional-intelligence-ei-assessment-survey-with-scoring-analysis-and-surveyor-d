import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuizScore {
    score: bigint;
    totalQuestions: bigint;
    timestamp: Time;
    playerName: string;
}
export interface TrainingLog {
    section: string;
    timestamp: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
    ageGroup: AgeGroup;
}
export enum AgeGroup {
    adult18_30 = "adult18_30",
    senior31plus = "senior31plus",
    under12 = "under12",
    teen13_17 = "teen13_17"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignAdminRole(user: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignUserRole(user: Principal): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTopScores(user: Principal): Promise<Array<QuizScore>>;
    getTrainingLogs(user: Principal): Promise<Array<TrainingLog>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    logTrainingSession(section: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQuizScore(score: QuizScore): Promise<void>;
}
