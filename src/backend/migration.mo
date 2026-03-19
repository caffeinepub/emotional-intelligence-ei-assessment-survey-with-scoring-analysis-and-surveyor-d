import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  type OldCompetency = {
    #selfAwareness;
    #managingEmotions;
    #motivatingOneself;
    #empathy;
    #socialSkill;
  };

  type OldInterpretationCategory = {
    #good;
    #indicatesDevelopment;
  };

  type OldSingleCompetencyScore = {
    total : Nat;
    category : OldInterpretationCategory;
  };

  type OldAssessmentAnswers = {
    item1 : Nat;
    item2 : Nat;
    item3 : Nat;
    item4 : Nat;
    item5 : Nat;
    item6 : Nat;
    item7 : Nat;
    item8 : Nat;
    item9 : Nat;
    item10 : Nat;
    item11 : Nat;
    item12 : Nat;
    item13 : Nat;
    item14 : Nat;
    item15 : Nat;
    item16 : Nat;
    item17 : Nat;
    item18 : Nat;
    item19 : Nat;
    item20 : Nat;
    item21 : Nat;
    item22 : Nat;
    item23 : Nat;
    item24 : Nat;
    item25 : Nat;
    item26 : Nat;
    item27 : Nat;
    item28 : Nat;
    item29 : Nat;
    item30 : Nat;
    item31 : Nat;
    item32 : Nat;
    item33 : Nat;
    item34 : Nat;
    item35 : Nat;
    item36 : Nat;
    item37 : Nat;
    item38 : Nat;
    item39 : Nat;
    item40 : Nat;
    item41 : Nat;
    item42 : Nat;
    item43 : Nat;
    item44 : Nat;
    item45 : Nat;
    item46 : Nat;
    item47 : Nat;
    item48 : Nat;
    item49 : Nat;
    item50 : Nat;
  };

  type OldAssessmentResults = {
    selfAwareness : OldSingleCompetencyScore;
    managingEmotions : OldSingleCompetencyScore;
    motivatingOneself : OldSingleCompetencyScore;
    empathy : OldSingleCompetencyScore;
    socialSkill : OldSingleCompetencyScore;
  };

  type OldSubmission = {
    respondent : Principal;
    timestamp : Time.Time;
    answers : OldAssessmentAnswers;
    results : OldAssessmentResults;
  };

  type OldActor = {
    submissions : Map.Map<Principal, OldSubmission>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type OldUserProfile = {
    name : Text;
  };

  type NewUserProfile = {
    name : Text;
    ageGroup : NewAgeGroup;
  };

  type NewAgeGroup = {
    #under12;
    #teen13_17;
    #adult18_30;
    #senior31plus;
  };

  type NewQuizScore = {
    playerName : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  type NewTrainingLog = {
    section : Text;
    timestamp : Time.Time;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    quizScores : Map.Map<Principal, [NewQuizScore]>;
    trainingLogs : Map.Map<Principal, [NewTrainingLog]>;
  };

  public func run(old : OldActor) : NewActor {
    let defaultAgeGroup = #adult18_30;

    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldProfile) {
        {
          name = oldProfile.name;
          ageGroup = defaultAgeGroup;
        };
      }
    );

    let emptyQuizScores = Map.empty<Principal, [NewQuizScore]>();
    let emptyTrainingLogs = Map.empty<Principal, [NewTrainingLog]>();

    {
      userProfiles = newUserProfiles;
      quizScores = emptyQuizScores;
      trainingLogs = emptyTrainingLogs;
    };
  };
};
