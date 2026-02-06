# Specification

## Summary
**Goal:** Prepare and deploy the existing EI assessment app as a production (“go live”) instance on the Internet Computer, with clear post-deploy verification steps.

**Planned changes:**
- Add a documented, production-ready deployment procedure (commands and order of operations) to build frontend assets and deploy both backend (Motoko) and frontend canisters to a production network target (e.g., IC mainnet).
- Ensure the deployed production frontend canister loads in a browser and can communicate with the backend canister without CORS/agent issues.
- Verify and document production behavior for Internet Identity authentication (login, logout, and persistence across refreshes).
- Add a production readiness checklist and a <10-minute smoke-test flow covering key user and admin/surveyor workflows (assessment completion + submission, results viewing, surveyor dashboard access and export to CSV/JSON, admin add/remove surveyors with changes taking effect without redeploy).

**User-visible outcome:** The app is accessible via a production canister URL, users can authenticate with Internet Identity, complete and submit the 50-item assessment and view results, surveyors can export submissions, and admins can manage surveyor access—all with a clear checklist and quick smoke-test steps to confirm the deployment is healthy.
