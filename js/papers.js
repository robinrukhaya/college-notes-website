// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Load resources from JSON file
let allPapers = [];

fetch('data/resources.json')
    .then(response => response.json())
    .then(data => {
        allPapers = data.filter(item => item.type === "Paper");
        displayPapers(allPapers);
    })
    .catch(error => {
        console.error('Error loading papers:', error);
        document.getElementById('papersGrid').innerHTML = 
            '<p class="no-results">⚠️ Unable to load papers. Please try again later.</p>';
    });

// Display papers in the grid
function displayPapers(papers) {
    const papersGrid = document.getElementById('papersGrid');
    const noResults = document.getElementById('noResults');

    if (papers.length === 0) {
        papersGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    papersGrid.innerHTML = papers.map(paper => `
        <div class="note-card">
            <div class="note-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <span class="note-tag">${paper.type}</span>
            <h3>${paper.title}</h3>
            <div class="note-meta">
                <span><i class="fas fa-book"></i> ${paper.subject}</span>
                <span><i class="fas fa-graduation-cap"></i> ${paper.branch}</span>
                <span><i class="fas fa-layer-group"></i> Sem ${paper.semester}</span>
            </div>
            <a href="${paper.file}" target="_blank" class="btn btn-primary download-btn">
                <i class="fas fa-download"></i> Download Paper
            </a>
        </div>
    `).join('');
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const branchFilter = document.getElementById('branchFilter');
const semesterFilter = document.getElementById('semesterFilter');
const resetBtn = document.getElementById('resetBtn');

function filterPapers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBranch = branchFilter.value;
    const selectedSemester = semesterFilter.value;

    const filtered = allPapers.filter(paper => {
        const matchesSearch = paper.title.toLowerCase().includes(searchTerm) || 
                              paper.subject.toLowerCase().includes(searchTerm);
        const matchesBranch = selectedBranch === 'all' || paper.branch === selectedBranch;
        const matchesSemester = selectedSemester === 'all' || paper.semester == selectedSemester;

        return matchesSearch && matchesBranch && matchesSemester;
    });

    displayPapers(filtered);
}

searchInput.addEventListener('input', filterPapers);
branchFilter.addEventListener('change', filterPapers);
semesterFilter.addEventListener('change', filterPapers);

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    branchFilter.value = 'all';
    semesterFilter.value = 'all';
    displayPapers(allPapers);
});
