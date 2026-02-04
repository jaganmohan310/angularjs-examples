// Dummy Data
const patients = [
    { id: 'PID-8821', name: 'Rahul Sharma', ward: 'General Ward', doctor: 'Dr. Sarah Johnson', date: '01/02/2026', status: 'Stable' },
    { id: 'PID-8825', name: 'Priya Verma', ward: 'ICU', doctor: 'Dr. Michael Chen', date: '03/02/2026', status: 'Critical' },
    { id: 'PID-8829', name: 'Amit Kumar', ward: 'Private', doctor: 'Dr. Robert Wilson', date: '30/01/2026', status: 'Recovering' }
];

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const appLayout = document.getElementById('app-layout');
const loginForm = document.getElementById('login-form');
const navLinks = document.querySelectorAll('.side-link');
const contentScreens = document.querySelectorAll('.content-screen');
const workspaceTitle = document.getElementById('workspace-title');
const logoutBtn = document.getElementById('logout-btn');

// --- Navigation Logic ---
function switchScreen(screenId) {
    contentScreens.forEach(screen => screen.classList.add('hidden'));

    const targetScreen = document.getElementById(`${screenId}-screen`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.screen === screenId);
    });

    const titleMap = {
        'dashboard': 'Admission Statistics',
        'admission': 'Registration',
        'cancellation': 'Consultation Cancellation',
        'patients': 'In-Patient List',
        'procedure': 'Procedure',
        'billing': 'Accounting',
        'discharge': 'Discharge Summary'
    };
    workspaceTitle.textContent = titleMap[screenId] || 'Workspace';

    if (screenId === 'dashboard') loadDashboard();
    if (screenId === 'patients') loadPatientList();
}

// --- Login Logic ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loginScreen.classList.add('hidden');
    appLayout.classList.remove('hidden');
    switchScreen('dashboard');
});

logoutBtn.addEventListener('click', () => {
    appLayout.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

// --- Table Loaders ---
function loadDashboard() {
    const tableBody = document.getElementById('recent-admissions-list');
    if (!tableBody) return;
    tableBody.innerHTML = patients.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.date}</td>
            <td>${p.doctor}</td>
            <td>${p.ward}</td>
        </tr>
    `).join('');
}

function loadPatientList() {
    const tableBody = document.getElementById('patients-list');
    if (!tableBody) return;
    tableBody.innerHTML = patients.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.ward}</td>
            <td>${p.doctor}</td>
            <td>${p.status}</td>
        </tr>
    `).join('');
}

// --- Navigation Item Clicks ---
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchScreen(link.dataset.screen);
    });
});

// Set initial screen
document.addEventListener('DOMContentLoaded', () => {
    // Already set by active/hidden classes in HTML
});
