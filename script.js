const contentUrl = "content.json";
const fallbackData = {
    research: [
        {
            title: "Human-centered AI systems",
            description: "Designing interactive workflows and evaluation tools so teams can build and interpret AI responsibly.",
            date: "2026"
        },
        {
            title: "Mixed-methods inquiry",
            description: "Combining qualitative field work with quantitative modeling to uncover real-world user needs and decision patterns.",
            date: "2026"
        },
        {
            title: "Responsible data pipelines",
            description: "Exploring data provenance, privacy-aware collection, and reproducible results for research products.",
            date: "2025"
        }
    ],
    projects: [
        {
            title: "Portfolio content engine",
            description: "A JSON-driven site architecture that loads projects, research, awards, and news from a shared content file.",
            date: "2026",
            link: "#contact",
            cta: "Talk about it"
        },
        {
            title: "Interactive publication dashboard",
            description: "A lightweight web interface that highlights publications, collaborators, and project milestones.",
            date: "2025"
        },
        {
            title: "Research methods toolkit",
            description: "A modular collection of templates for interviews, surveys, and synthesis workflows used across multiple projects.",
            date: "2024"
        }
    ],
    awards: [
        {
            title: "Best Poster Award",
            description: "Recognized for presenting a research poster on explainable user interfaces at the annual ACM Symposium.",
            date: "2025"
        },
        {
            title: "Research Grant Finalist",
            description: "Shortlisted for external funding to study low-bias machine learning models in health technology.",
            date: "2024"
        }
    ],
    news: [
        {
            title: "Website refreshed",
            description: "Updated this portfolio to pull content for every section from a JSON data file, making it easier to maintain.",
            date: "July 2026"
        },
        {
            title: "New collaboration launched",
            description: "Started a cross-disciplinary research effort focusing on ethical AI adoption in education.",
            date: "June 2026"
        }
    ]
};

document.getElementById("year").textContent = new Date().getFullYear();

async function loadContent() {
    let content = fallbackData;

    try {
        const response = await fetch(contentUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        content = await response.json();
    } catch (error) {
        console.warn("Unable to fetch JSON content, using fallback data:", error);
    }

    renderSection("research", content.research);
    renderSection("projects", content.projects);
    renderSection("awards", content.awards);
    renderSection("news", content.news);
}

function renderSection(sectionId, items = []) {
    var count = 3;
    const container = document.getElementById(`${sectionId}-items`);
    if (!container) return;
    container.innerHTML = "";

    if (!items.length) {
        container.innerHTML = "<p>No items available yet.</p>";
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "card reveal";
        card.setAttribute("data-order", count++);

        const title = document.createElement("h3");
        title.textContent = item.title;
        card.appendChild(title);

        if (item.date) {
            const date = document.createElement("p");
            date.className = "card-date";
            date.textContent = item.date;
            card.appendChild(date);
        }

        const description = document.createElement("p");
        description.textContent = item.description;
        card.appendChild(description);

        if (item.link) {
            const link = document.createElement("a");
            link.className = "card-link";
            link.href = item.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = item.cta || "Learn more";
            card.appendChild(link);
        }

        container.appendChild(card);
    });

    initRevealAnimations();
}

function toggleNavbarBackground(scrollY) {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const shouldBeSticky = (typeof scrollY === "number" ? scrollY : window.scrollY) > 20;
    nav.classList.toggle("sticky-nav", shouldBeSticky);
}

let lastKnownScrollY = 0;
let ticking = false;

function onScroll() {
    lastKnownScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            toggleNavbarBackground(lastKnownScrollY);
            ticking = false;
        });
        ticking = true;
    }
}

function initRevealAnimations() {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const readyQueue = new Set();

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    readyQueue.add(entry.target);
                    observer.unobserve(entry.target);
                }
            });
            if (readyQueue.size) processRevealQueue();
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -80px 0px"
        }
    );

    function processRevealQueue() {
        const items = Array.from(readyQueue).filter((el) => !el.classList.contains("visible"));
        if (!items.length) return;

        items.sort((a, b) => (Number(a.dataset.order || 0) - Number(b.dataset.order || 0)));

        const baseDelay = 120; // ms between reveals
        items.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("visible");
                readyQueue.delete(el);
            }, i * baseDelay);
        });
    }

    reveals.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    loadContent();
    toggleNavbarBackground();
    window.addEventListener("scroll", onScroll, { passive: true });
    initRevealAnimations();
});
