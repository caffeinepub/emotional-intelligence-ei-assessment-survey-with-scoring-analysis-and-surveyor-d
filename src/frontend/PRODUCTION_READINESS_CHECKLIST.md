# Production Readiness Checklist

Use this checklist to verify that your EI Assessment application deployment is production-ready.

## Pre-Deployment

- [ ] Source code is committed to version control with a tagged release
- [ ] Frontend build completes without errors (`npm run build`)
- [ ] Backend compiles without errors
- [ ] All tests pass (if applicable)
- [ ] Environment variables are documented
- [ ] Deployment target network is confirmed (IC mainnet)

## Deployment Verification

- [ ] **Backend Canister Deployed**
  - [ ] Backend canister ID recorded: `_____________________`
  - [ ] Backend canister has sufficient cycles
  - [ ] Backend canister status is "Running"

- [ ] **Frontend Canister Deployed**
  - [ ] Frontend canister ID recorded: `_____________________`
  - [ ] Frontend canister has sufficient cycles
  - [ ] Frontend canister status is "Running"
  - [ ] Frontend URL recorded: `https://_____________________.ic0.app`

## Functional Verification

### 1. Internet Identity Authentication

- [ ] **Login Flow**
  - [ ] Frontend URL loads successfully in browser
  - [ ] Login button is visible and clickable
  - [ ] Clicking login redirects to Internet Identity
  - [ ] Can complete Internet Identity authentication
  - [ ] Successfully redirected back to application after login
  - [ ] User profile setup modal appears for first-time users
  - [ ] Can enter and save display name

- [ ] **Session Persistence**
  - [ ] After login, refresh the page - user remains logged in
  - [ ] Identity persists across browser tabs
  - [ ] Can navigate between pages while logged in

- [ ] **Logout Flow**
  - [ ] Logout button is visible when logged in
  - [ ] Clicking logout clears the session
  - [ ] After logout, user is shown as logged out
  - [ ] After logout, refresh shows user as logged out

### 2. Assessment Functionality

- [ ] **Assessment Submission**
  - [ ] Can access the assessment page when logged in
  - [ ] All 50 questions are displayed correctly
  - [ ] Can select answers for all questions (1-5 scale)
  - [ ] Progress indicator updates as questions are answered
  - [ ] Submit button is disabled until all questions are answered
  - [ ] Submit button is enabled when all questions are answered
  - [ ] Can successfully submit the assessment
  - [ ] Success message appears after submission
  - [ ] Cannot submit assessment twice (appropriate error/message shown)

- [ ] **Results Display**
  - [ ] Can access results page after submission
  - [ ] Results page shows all five competency scores
  - [ ] Each competency displays total score
  - [ ] Each competency displays interpretation category (badge)
  - [ ] Scores match expected calculations
  - [ ] Results persist after page refresh

### 3. Surveyor Dashboard Access

- [ ] **Surveyor Permissions**
  - [ ] Admin can access the surveyor dashboard
  - [ ] Surveyor (if added) can access the surveyor dashboard
  - [ ] Non-surveyor users cannot access the surveyor dashboard
  - [ ] Appropriate error message shown to unauthorized users

- [ ] **Data Export**
  - [ ] Surveyor dashboard displays all submissions
  - [ ] Submissions are sorted by latest first
  - [ ] Each submission shows respondent, timestamp, and scores
  - [ ] **CSV Export:** Can export submissions to CSV
  - [ ] **CSV Export:** Downloaded CSV file contains all submission data
  - [ ] **CSV Export:** CSV format is correct and opens in spreadsheet software
  - [ ] **JSON Export:** Can export submissions to JSON
  - [ ] **JSON Export:** Downloaded JSON file contains all submission data
  - [ ] **JSON Export:** JSON format is valid and parseable

### 4. Admin Surveyor Management

- [ ] **Admin Access**
  - [ ] Admin can access the admin surveyors page
  - [ ] Non-admin users cannot access the admin surveyors page
  - [ ] Appropriate error message shown to unauthorized users

- [ ] **Grant Surveyor Access**
  - [ ] Can enter a principal ID in the grant access form
  - [ ] Can submit the form to grant surveyor access
  - [ ] Success message appears after granting access
  - [ ] Granted user can immediately access surveyor dashboard (without redeploy)
  - [ ] Granted user appears in the surveyor list (if implemented)

- [ ] **Revoke Surveyor Access**
  - [ ] Can enter a principal ID in the revoke access form
  - [ ] Can submit the form to revoke surveyor access
  - [ ] Success message appears after revoking access
  - [ ] Revoked user can no longer access surveyor dashboard (without redeploy)
  - [ ] Revoked user is removed from surveyor list (if implemented)

## Performance and UX

- [ ] **Loading States**
  - [ ] Loading indicators appear during data fetches
  - [ ] Loading indicators appear during mutations (submissions, grants, revokes)
  - [ ] No blank screens or undefined states
  - [ ] Smooth transitions between loading and loaded states

- [ ] **Error Handling**
  - [ ] Network errors are caught and displayed to users
  - [ ] Backend errors are caught and displayed to users
  - [ ] Error messages are user-friendly (not raw technical errors)
  - [ ] Users can recover from errors without refreshing

- [ ] **Responsive Design**
  - [ ] Application works on desktop browsers
  - [ ] Application works on tablet devices
  - [ ] Application works on mobile devices
  - [ ] Navigation is accessible on all screen sizes

## Security

- [ ] **Authentication Guards**
  - [ ] Unauthenticated users cannot access protected pages
  - [ ] Unauthenticated users are redirected or shown appropriate message
  - [ ] Assessment data is only visible to authenticated users

- [ ] **Authorization Guards**
  - [ ] Non-surveyors cannot access surveyor dashboard
  - [ ] Non-admins cannot access admin pages
  - [ ] Backend enforces authorization (not just frontend)

- [ ] **Data Privacy**
  - [ ] Users can only see their own assessment results
  - [ ] Surveyors can see all submissions (as intended)
  - [ ] Principal IDs are handled securely

## Documentation

- [ ] Deployment information is recorded (canister IDs, URLs)
- [ ] Admin principal ID is documented
- [ ] Initial surveyor principals are documented (if any)
- [ ] Deployment date and version are recorded
- [ ] Contact information for support is documented

## Monitoring and Maintenance

- [ ] **Canister Cycles**
  - [ ] Backend canister has sufficient cycles (check with `dfx canister status`)
  - [ ] Frontend canister has sufficient cycles (check with `dfx canister status`)
  - [ ] Cycle monitoring plan is in place

- [ ] **Backup Plan**
  - [ ] Initial data export completed (if applicable)
  - [ ] Backup schedule is defined
  - [ ] Recovery procedure is documented

## Sign-Off

- [ ] All checklist items are completed
- [ ] Smoke test has been executed successfully (see SMOKE_TEST_PRODUCTION.md)
- [ ] Deployment is approved for production use

**Deployed By:** _____________________  
**Date:** _____________________  
**Version/Tag:** _____________________  
**Approved By:** _____________________  

## Notes

Use this section to record any deployment-specific notes, issues encountered, or deviations from the standard process:

