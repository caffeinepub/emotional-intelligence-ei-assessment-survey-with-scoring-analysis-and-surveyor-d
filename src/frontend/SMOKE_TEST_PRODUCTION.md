# Production Smoke Test

This smoke test verifies that all critical functionality works correctly in the production environment. Complete this test immediately after deployment to catch any issues early.

**Estimated Time:** 6-8 minutes

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
7. Verify you see the authenticated UI (logout button, navigation menu)

**Expected Results:**
- ✅ Homepage loads successfully
- ✅ No console errors
- ✅ Login redirects to Internet Identity
- ✅ Successfully authenticated and redirected back
- ✅ Authenticated UI is visible (logout button, navigation)

**Record Your Principal ID:**

