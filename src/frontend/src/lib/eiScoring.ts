import { COMPETENCY_MAPPING } from '../content/eiStatements';
import type { AssessmentAnswers } from '../backend';

export type CompetencyScores = {
  selfAwareness: number;
  managingEmotions: number;
  motivatingOneself: number;
  empathy: number;
  socialSkill: number;
};

export function calculateCompetencyScores(answers: number[]): CompetencyScores {
  const getScore = (indices: number[]) => {
    return indices.reduce((sum, idx) => sum + (answers[idx - 1] || 0), 0);
  };

  return {
    selfAwareness: getScore(COMPETENCY_MAPPING.selfAwareness),
    managingEmotions: getScore(COMPETENCY_MAPPING.managingEmotions),
    motivatingOneself: getScore(COMPETENCY_MAPPING.motivatingOneself),
    empathy: getScore(COMPETENCY_MAPPING.empathy),
    socialSkill: getScore(COMPETENCY_MAPPING.socialSkill),
  };
}

export function answersArrayToBackendFormat(answers: number[]): AssessmentAnswers {
  const result: any = {};
  for (let i = 0; i < 50; i++) {
    result[`item${i + 1}`] = BigInt(answers[i] || 0);
  }
  return result as AssessmentAnswers;
}
