# Production Smoke Test

This smoke test verifies that all critical functionality works correctly in the production environment. Complete this test immediately after deployment to catch any issues early.

**Estimated Time:** 8-10 minutes

## Prerequisites

- Production frontend URL: `https://_____________________.ic0.app`
- Two different browsers or incognito windows (for testing multiple users)
- A text editor or notepad for recording principal IDs

## Test Execution

### Test 1: Initial Load and Authentication (2 minutes)

**Steps:**

1. Open the production frontend URL in a browser
2. Verify the homepage loads without errors
3. Open browser developer console (F12) and check for errors
4. Click the "Login" button
5. Complete Internet Identity authentication
6. Verify you're redirected back to the application
7. Verify the profile setup modal appears (first-time login)
8. Enter a display name (e.g., "Test Admin") and save
9. Verify the modal closes and you see the authenticated UI

**Expected Results:**
- ✅ Homepage loads successfully
- ✅ No console errors
- ✅ Login redirects to Internet Identity
- ✅ Successfully authenticated and redirected back
- ✅ Profile setup modal appears
- ✅ Display name is saved
- ✅ Authenticated UI is visible (logout button, user name)

**Record Your Principal ID:**
