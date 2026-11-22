# Tech Opportunity Radar

A zero-cost, serverless web application that aggregates remote software engineering roles, internships, and active open-source hackathons into a single searchable dashboard.

![Node.js](https://img.shields.io/badge/Node.js-20-43853D?style=flat-square&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Automated-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-UI-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-222222?style=flat-square&logo=github&logoColor=white)

**Live Application:** [https://abirboss8055.github.io/tech-opportunity-radar/](https://abirboss8055.github.io/tech-opportunity-radar/)

---

## Overview

Students and early-career developers often miss out on remote roles, internships, and open-source events scattered across different platforms. **Tech Opportunity Radar** solves this with a fully automated, serverless pipeline. Every 24 hours, a scheduled workflow pulls fresh listings from public APIs, normalizes the data into a flat-file JSON store, and serves it through a fast, filterable client-side interface.

## Data Sources

All listings are fetched automatically from public, unauthenticated REST APIs and normalized into a unified schema:

| Source | Endpoint / Query | Data Collected |
| :--- | :--- | :--- |
| **Remotive API** | `remotive.com/api/remote-jobs?category=software-dev&limit=20` | Remote software development jobs and internships, company names, locations, tags, and publication dates. |
| **GitHub Search API** | `api.github.com/search/repositories?q=topic:hackathon+OR+topic:open-source-program` | Recently updated repositories tagged with `hackathon` or `open-source-program`, including owner info, topics, and direct repository links. |

## Key Features

* **Automated Daily Sync:** Runs on a scheduled GitHub Actions cron job (`0 0 * * *` UTC) with manual trigger support (`workflow_dispatch`).
* **Real-Time Search:** Instant client-side filtering across titles, organizations, locations, and tech-stack tags.
* **Category Filtering:** Quickly switch between All, Internship, Remote Role, Hackathon / OSS, and Saved views.
* **Persistent Client-Side Bookmarks:** Uses the browser's `localStorage` API so users can save opportunities without creating an account or requiring a backend database.
* **Zero Infrastructure Cost:** Built and hosted entirely on GitHub Actions and GitHub Pages.

## System Architecture

```text
tech-opportunity-radar/
├── .github/
│   └── workflows/
│       └── update-opportunities.yml   # Daily cron automation (00:00 UTC)
├── fetch-opportunities.js             # Node.js data ingestion & normalization script
├── opportunities.json                 # Auto-updated flat-file JSON datastore
├── index.html                         # Searchable, responsive frontend (Tailwind + Vanilla JS)
└── README.md                          # Project documentation