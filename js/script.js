// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sample featured resources data
const featuredResources = [
    {
        title: "Data Structures - Topper Notes",
        subject: "CSE • Semester 3",
        type: "Notes",
        link: "assets/pdfs/notes/ds-topper.pdf"
    },
    {
        title: "Operating Systems - 2023 Paper",
        subject: "CSE • Semester 4",
        type: "Paper",
        link: "assets/pdfs/papers/os-2023.pdf"
    },
    {
        title: "DBMS Important Questions",
        subject: "CSE • Semester 4",
        type: "Question Bank",
        link: "assets/pdfs/notes/dbms-imp.pdf"
    },
    {
        title: "Mathematics - Topper Handwritten",
        subject: "All Branches • Sem 1",
        type: "Notes",
        link: "assets/pdfs/notes/maths-topper.pdf"
    }
];

// Load featured resources on home page
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid) {
    featuredGrid.innerHTML = featuredResources.map(resource => `
        <div class="resource-card">
            <span class="tag">${resource.type}</span>
            <h3>${resource.title}</h3>
            <p>${resource.subject}</p>
            <a href="${resource.link}" target="_blank">
                <i class="fas fa-download"></i> Download PDF
            </a>
        </div>
    `).join('');
}
