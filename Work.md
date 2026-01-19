# Project Work Documentation

## Task Overview
This project is a **Job Application Tracker** built using Angular and PrimeNG. The application allows users to:

- Add, edit, and delete job applications.
- Track the status of applications.
- View deadlines and statuses in a color-coded calendar.
- View job application data in a sortable, searchable table.
- Visualize statistics via charts (doughnut, bar, line) and KPI cards.
- Keep job data locally stored securely using `secure-ls`.
- RxJS used for efficient state management.

The project also includes a simple info page describing the application.
You can view the deployed version in this link https://rouistaha.github.io/JobAppTracker/browser/jobs
---

## Easy Tasks
- Implementing **basic CRUD operations** for jobs.
- Creating a **responsive sidebar** with routing to Jobs, Stats, and Info pages.
- Setting up **PrimeNG table and calendar components**.
- Storing data locally with `secure-ls`.

---

## Challenging Parts
- Implementing **reactive chart updates** so the statistics dashboard updates live when jobs are added, edited, or deleted.
- Handling **calendar interactions**, including:
  - Clicking on empty dates to open the add dialog.
  - Clicking on existing events to open the edit dialog.
  - Handling delete actions from calendar events.

---

## Extra Features (Bonus)
- Added **animated KPI cards** and responsive hover effects for a professional dashboard feel.
- Implemented **local storage encryption** with `secure-ls`.
- Calendar events are **color-coded** based on job status.
- Implemented **real-time search filtering** in the jobs table.

