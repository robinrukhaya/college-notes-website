// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Load resources from JSON file
let allNotes = [];

fetch('data/resources.json')
    .then(response => response.json())
    .then(data => {
        allNotes = data.filter(item => item.type === "Notes");
        displayNotes(allNotes);
    })
    .catch(error => {
        console.error('Error loading notes:', error);
        document.getElementById('notesGrid').innerHTML = 
            '<p class="no-results">⚠️ Unable to load notes. Please try again later.</p>';
    });

// Display notes in the grid
function displayNotes(notes) {
    const notesGrid = document.getElementById('notesGrid');
    const noResults = document.getElementById('noResults');

    if (notes.length === 0) {
        notesGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    notesGrid.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <span class="note-tag">${note.type}</span>
            <h3>${note.title}</h3>
            <div class="note-meta">
                <span><i class="fas fa-book"></i> ${note.subject}</span>
                <span><i class="fas fa-graduation-cap"></i> ${note.branch}</span>
                <span><i class="fas fa-layer-group"></i> Sem ${note.semester}</span>
            </div>
            <a href="${note.file}" target="_blank" class="btn btn-primary download-btn">
                <i class="fas fa-download"></i> Download PDF
            </a>
        </div>
    `).join('');
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const branchFilter = document.getElementById('branchFilter');
const semesterFilter = document.getElementById('semesterFilter');
const resetBtn = document.getElementById('resetBtn');

function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBranch = branchFilter.value;
    const selectedSemester = semesterFilter.value;

    const filtered = allNotes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm) || 
                              note.subject.toLowerCase().includes(searchTerm);
        const matchesBranch = selectedBranch === 'all' || note.branch === selectedBranch;
        const matchesSemester = selectedSemester === 'all' || note.semester == selectedSemester;

        return matchesSearch && matchesBranch && matchesSemester;
    });

    displayNotes(filtered);
}

searchInput.addEventListener('input', filterNotes);
branchFilter.addEventListener('change', filterNotes);
semesterFilter.addEventListener('change', filterNotes);

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    branchFilter.value = 'all';
    semesterFilter.value = 'all';
    displayNotes(allNotes);
});
