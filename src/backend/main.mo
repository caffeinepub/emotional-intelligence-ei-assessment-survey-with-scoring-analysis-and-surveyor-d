import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Competency = {
    #selfAwareness;
    #managingEmotions;
    #motivatingOneself;
    #empathy;
    #socialSkill;
  };

  type InterpretationCategory = {
    #good;
    #indicatesDevelopment;
  };

  type SingleCompetencyScore = {
    total : Nat;
    category : InterpretationCategory;
  };

  type AssessmentAnswers = {
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

  type AssessmentResults = {
    selfAwareness : SingleCompetencyScore;
    managingEmotions : SingleCompetencyScore;
    motivatingOneself : SingleCompetencyScore;
    empathy : SingleCompetencyScore;
    socialSkill : SingleCompetencyScore;
  };

  type Submission = {
    respondent : Principal;
    timestamp : Time.Time;
    answers : AssessmentAnswers;
    results : AssessmentResults;
  };

  public type UserProfile = {
    name : Text;
  };

  module Submission {
    public func compare(s1 : Submission, s2 : Submission) : Order.Order {
      if (s1.timestamp < s2.timestamp) {
        return #less;
      };
      if (s1.timestamp > s2.timestamp) {
        return #greater;
      };
      Text.compare(s1.respondent.toText(), s2.respondent.toText());
    };
  };

  func calculateCompetency(answers : AssessmentAnswers, itemIndices : [Nat]) : SingleCompetencyScore {
    var total : Nat = 0;

    for (i in itemIndices.values()) {
      switch (i) {
        case (1) { total += answers.item1 };
        case (2) { total += answers.item2 };
        case (3) { total += answers.item3 };
        case (4) { total += answers.item4 };
        case (5) { total += answers.item5 };
        case (6) { total += answers.item6 };
        case (7) { total += answers.item7 };
        case (8) { total += answers.item8 };
        case (9) { total += answers.item9 };
        case (10) { total += answers.item10 };
        case (11) { total += answers.item11 };
        case (12) { total += answers.item12 };
        case (13) { total += answers.item13 };
        case (14) { total += answers.item14 };
        case (15) { total += answers.item15 };
        case (16) { total += answers.item16 };
        case (17) { total += answers.item17 };
        case (18) { total += answers.item18 };
        case (19) { total += answers.item19 };
        case (20) { total += answers.item20 };
        case (21) { total += answers.item21 };
        case (22) { total += answers.item22 };
        case (23) { total += answers.item23 };
        case (24) { total += answers.item24 };
        case (25) { total += answers.item25 };
        case (26) { total += answers.item26 };
        case (27) { total += answers.item27 };
        case (28) { total += answers.item28 };
        case (29) { total += answers.item29 };
        case (30) { total += answers.item30 };
        case (31) { total += answers.item31 };
        case (32) { total += answers.item32 };
        case (33) { total += answers.item33 };
        case (34) { total += answers.item34 };
        case (35) { total += answers.item35 };
        case (36) { total += answers.item36 };
        case (37) { total += answers.item37 };
        case (38) { total += answers.item38 };
        case (39) { total += answers.item39 };
        case (40) { total += answers.item40 };
        case (41) { total += answers.item41 };
        case (42) { total += answers.item42 };
        case (43) { total += answers.item43 };
        case (44) { total += answers.item44 };
        case (45) { total += answers.item45 };
        case (46) { total += answers.item46 };
        case (47) { total += answers.item47 };
        case (48) { total += answers.item48 };
        case (49) { total += answers.item49 };
        case (50) { total += answers.item50 };
        case (_) {};
      };
    };

    let category = if (total >= 37) {
      #good;
    } else {
      #indicatesDevelopment;
    };

    { total; category };
  };

  func computeAssessmentResults(answers : AssessmentAnswers) : AssessmentResults {
    let selfAwarenessItems = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46];
    let managingEmotionsItems = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47];
    let motivatingOneselfItems = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48];
    let empathyItems = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49];
    let socialSkillItems = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    {
      selfAwareness = calculateCompetency(answers, selfAwarenessItems);
      managingEmotions = calculateCompetency(answers, managingEmotionsItems);
      motivatingOneself = calculateCompetency(answers, motivatingOneselfItems);
      empathy = calculateCompetency(answers, empathyItems);
      socialSkill = calculateCompetency(answers, socialSkillItems);
    };
  };

  module SurveyorDashboard {
    public func compareByLatest(submission1 : Submission, submission2 : Submission) : Order.Order {
      if (submission1.timestamp > submission2.timestamp) {
        return #less;
      };
      if (submission1.timestamp < submission2.timestamp) {
        return #greater;
      };
      #equal;
    };
  };

  let submissions = Map.empty<Principal, Submission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Assessment Submission
  public shared ({ caller }) func submitAssessment(answers : AssessmentAnswers) : async AssessmentResults {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit assessments");
    };

    let existingSubmission = submissions.get(caller);
    if (existingSubmission != null) {
      Runtime.trap("You already completed the assessment");
    };

    let results = computeAssessmentResults(answers);
    let submission : Submission = {
      respondent = caller;
      timestamp = Time.now();
      answers;
      results;
    };

    submissions.add(caller, submission);

    results;
  };

  // Get own submission
  public query ({ caller }) func getMySubmission() : async ?Submission {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their submissions");
    };
    submissions.get(caller);
  };

  // Surveyor Dashboard - accessible by admins (surveyors are assigned admin role)
  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only surveyors can view all submissions");
    };

    submissions.values().toArray().sort(SurveyorDashboard.compareByLatest);
  };

  // Surveyor management - admin only (assignRole already includes admin-only guard)
  public shared ({ caller }) func assignSurveyorAccess(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  public shared ({ caller }) func revokeSurveyorAccess(user : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  // Onboarding (public information - no authentication required, accessible to guests)
  public query func getCompetencyMapping() : async Text {
    "Self awareness: 1,6,11,16,21,26,31,36,41,46 ; Managing emotions: 2,7,12,17,22,27,32,37,42,47 ; Motivating oneself: 3,8,13,18,23,28,33,38,43,48 ; Empathy: 4,9,14,19,24,29,34,39,44,49 ; Social Skill: 5,10,15,20,25,30,35,40,45,50";
  };
};
