import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type UserProfile = {
    name : Text;
    ageGroup : AgeGroup;
  };

  public type AgeGroup = {
    #under12;
    #teen13_17;
    #adult18_30;
    #senior31plus;
  };

  public type QuizScore = {
    playerName : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  type TrainingLog = {
    section : Text;
    timestamp : Time.Time;
  };

  func compareQuizScores(q1 : QuizScore, q2 : QuizScore) : Order.Order {
    if (q1.score > q2.score) {
      return #less;
    };
    if (q1.score < q2.score) {
      return #greater;
    };
    #equal;
  };

  let quizScores = Map.empty<Principal, [QuizScore]>();
  let trainingLogs = Map.empty<Principal, [TrainingLog]>();
  var userProfiles = Map.empty<Principal, UserProfile>();

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

  // Quiz Score Management
  public shared ({ caller }) func submitQuizScore(score : QuizScore) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit scores");
    };

    let currentScores = switch (quizScores.get(caller)) {
      case (null) { [] };
      case (?existing) { existing };
    };

    let updatedScores = currentScores.concat([score]);
    quizScores.add(caller, updatedScores);
  };

  public query ({ caller }) func getTopScores(user : Principal) : async [QuizScore] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own scores");
    };

    switch (quizScores.get(user)) {
      case (null) { [] };
      case (?scores) { scores.sort(compareQuizScores) };
    };
  };

  // Training Log Management
  public shared ({ caller }) func logTrainingSession(section : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log training sessions");
    };

    let log : TrainingLog = {
      section;
      timestamp = Time.now();
    };

    let currentLogs = switch (trainingLogs.get(caller)) {
      case (null) { [] };
      case (?existing) { existing };
    };

    let updatedLogs = currentLogs.concat([log]);
    trainingLogs.add(caller, updatedLogs);
  };

  public query ({ caller }) func getTrainingLogs(user : Principal) : async [TrainingLog] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own logs");
    };

    switch (trainingLogs.get(user)) {
      case (null) { [] };
      case (?logs) { logs };
    };
  };

  // Admin functions (assignRole already includes admin-only guard)
  public shared ({ caller }) func assignAdminRole(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  public shared ({ caller }) func assignUserRole(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };
};

