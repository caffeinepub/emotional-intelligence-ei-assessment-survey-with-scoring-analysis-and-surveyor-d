import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SingleCompetencyScore {
    total: bigint;
    category: InterpretationCategory;
}
export interface AssessmentAnswers {
    item10: bigint;
    item11: bigint;
    item12: bigint;
    item13: bigint;
    item14: bigint;
    item15: bigint;
    item16: bigint;
    item17: bigint;
    item18: bigint;
    item19: bigint;
    item20: bigint;
    item21: bigint;
    item22: bigint;
    item23: bigint;
    item24: bigint;
    item25: bigint;
    item26: bigint;
    item27: bigint;
    item28: bigint;
    item29: bigint;
    item30: bigint;
    item31: bigint;
    item32: bigint;
    item33: bigint;
    item34: bigint;
    item35: bigint;
    item36: bigint;
    item37: bigint;
    item38: bigint;
    item39: bigint;
    item40: bigint;
    item41: bigint;
    item42: bigint;
    item43: bigint;
    item44: bigint;
    item45: bigint;
    item46: bigint;
    item47: bigint;
    item48: bigint;
    item49: bigint;
    item50: bigint;
    item1: bigint;
    item2: bigint;
    item3: bigint;
    item4: bigint;
    item5: bigint;
    item6: bigint;
    item7: bigint;
    item8: bigint;
    item9: bigint;
}
export interface AssessmentResults {
    selfAwareness: SingleCompetencyScore;
    socialSkill: SingleCompetencyScore;
    managingEmotions: SingleCompetencyScore;
    motivatingOneself: SingleCompetencyScore;
    empathy: SingleCompetencyScore;
}
export interface Submission {
    answers: AssessmentAnswers;
    results: AssessmentResults;
    timestamp: Time;
    respondent: Principal;
}
export interface UserProfile {
    name: string;
}
export enum InterpretationCategory {
    good = "good",
    indicatesDevelopment = "indicatesDevelopment"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignSurveyorAccess(user: Principal): Promise<void>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompetencyMapping(): Promise<string>;
    getMySubmission(): Promise<Submission | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    revokeSurveyorAccess(user: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitAssessment(answers: AssessmentAnswers): Promise<AssessmentResults>;
}
