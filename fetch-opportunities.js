const fs = require('fs');

async function fetchOpportunities() {
    const opportunities = [];

    // 1. Fetch Remote Software Dev Roles & Internships from Remotive
    try {
        console.log("Fetching remote tech roles...");
        const remotiveRes = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=20');
        if (remotiveRes.ok) {
            const remotiveData = await remotiveRes.json();
            const jobs = remotiveData.jobs.map(job => ({
                id: `remotive-${job.id}`,
                title: job.title,
                organization: job.company_name,
                category: job.title.toLowerCase().includes('intern') ? 'Internship' : 'Remote Role',
                location: job.candidate_required_location || 'Worldwide',
                tags: (job.tags || []).slice(0, 4),
                url: job.url,
                date: job.publication_date
            }));
            opportunities.push(...jobs);
        }
    } catch (error) {
        console.error("Remotive fetch failed:", error.message);
    }

    // 2. Fetch Active Hackathons & Open-Source Programs from GitHub
    try {
        console.log("Fetching active hackathons and open-source programs...");
        const ghRes = await fetch('https://api.github.com/search/repositories?q=topic:hackathon+OR+topic:open-source-program&sort=updated&order=desc&per_page=12');
        if (ghRes.ok) {
            const ghData = await ghRes.json();
            const programs = ghData.items.map(repo => ({
                id: `gh-${repo.id}`,
                title: repo.name.replace(/-/g, ' '),
                organization: repo.owner.login,
                category: 'Hackathon / OSS',
                location: 'Online',
                tags: (repo.topics || []).slice(0, 4),
                url: repo.html_url,
                date: repo.updated_at
            }));
            opportunities.push(...programs);
        }
    } catch (error) {
        console.error("GitHub fetch failed:", error.message);
    }

    // Sort all opportunities by newest first
    opportunities.sort((a, b) => new Date(b.date) - new Date(a.date));

    const payload = {
        lastUpdated: new Date().toISOString(),
        totalCount: opportunities.length,
        items: opportunities
    };

    fs.writeFileSync('opportunities.json', JSON.stringify(payload, null, 2));
    console.log(`Saved ${opportunities.length} opportunities to opportunities.json`);
}

fetchOpportunities();