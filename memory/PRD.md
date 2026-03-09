# PRD - Devansh Buildsmore Website

## Original Problem Statement
Create a modern website for Devansh Buildsmore (construction firm based in Ghaziabad, serving NCR + nearby regions including Meerut) with strong visual design (scrolling background transitions), services/project content, and a contact form that collects lead details and sends email to vvishal.infosys@gmail.com.

## User Choices Captured
- Contact email delivery: Gmail SMTP with App Password
- Visual style: Bold industrial (dark + orange/yellow accents)
- Contact form: include all common fields, keep most optional
- Company details: proceed with smart defaults for now

## Architecture Decisions
- Frontend: React single-page marketing site with section-based scroll flow and dynamic background transitions.
- UI Motion: Framer Motion for reveal animations + Lenis for smooth scrolling.
- Backend: FastAPI endpoint `/api/contact` with pydantic validation and Gmail SMTP delivery using env credentials.
- Database: MongoDB collection `contact_leads` stores submitted lead records (ISO datetime, no ObjectId leakage in API responses).

## Implemented
- Full modern one-page website with sections: Hero, Services, Projects, Process, Coverage, Contact, Footer.
- Sticky glass navigation with section anchor links and high-contrast industrial theme.
- Contact form with fields:
  - name (required)
  - phone, email, interest_area, project_type, budget_range, plot_area, preferred_start_date, city_location, message (optional)
- Backend validation enforces at least one contact method (email or phone).
- Backend sends enquiry email to vvishal.infosys@gmail.com via Gmail SMTP and stores lead in MongoDB on success.
- Added robust error handling for missing SMTP config.
- Added comprehensive `data-testid` attributes for interactive and key UI elements.

## Testing Summary
- Self-tested with curl and Playwright screenshots (desktop + mobile).
- Testing agent report: `/app/test_reports/iteration_1.json`.
- Passing flows:
  - `/api/` health/root message
  - `/api/contact` validation for missing email/phone
  - Frontend nav/section transitions/form editability
- Blocked until credentials are added:
  - Successful SMTP delivery requires `SMTP_EMAIL` and `SMTP_APP_PASSWORD` in `backend/.env`.

## Prioritized Backlog
### P0 (Immediate)
- Add SMTP credentials in backend `.env` and verify end-to-end successful email send from live form.
- Replace placeholder phone number with final business phone.

### P1 (Next)
- Add admin lead inbox view (protected page) to review enquiries without email dependency.
- Add anti-spam guard (honeypot + rate limit for contact endpoint).

### P2 (Later)
- Add real project case studies with before/after galleries and measurable outcomes.
- Add multilingual content option (English/Hindi).

## Next Tasks
1. Configure SMTP_EMAIL and SMTP_APP_PASSWORD in backend env.
2. Submit one live form test and verify email in vvishal.infosys@gmail.com inbox.
3. Replace default company phone/address with final approved details.
