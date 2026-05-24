/* ========== DATA LAYER ========== */

const API_BASE = '/api';
const LS_QUESTIONS_KEY = 'comunitat_questions_v1';
const LS_ANSWERS_KEY = 'comunitat_answers_v1';
const CATEGORIES = [
    'Matemàtiques',
    'Programació',
    'Idiomes',
    'Ciència',
    'Altres'
];

async function fetchJson(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const payload = await response.text();
        throw new Error(`${response.status} ${response.statusText} - ${payload}`);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
}

async function loadQuestions() {
    return await fetchJson(`${API_BASE}/questions`);
}

async function loadAnswers() {
    return await fetchJson(`${API_BASE}/answers`);
}

async function createQuestion(title, content, author, category) {
    const payload = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Anònim',
        category
    };

    return await fetchJson(`${API_BASE}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

async function deleteQuestion(questionId) {
    await fetchJson(`${API_BASE}/questions/${questionId}`, {
        method: 'DELETE'
    });
}

async function updateQuestionStatus(questionId, newStatus) {
    return await fetchJson(`${API_BASE}/questions/${questionId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
}

async function createAnswer(questionId, content, author) {
    const payload = {
        content: content.trim(),
        author: author.trim() || 'Anònim'
    };

    return await fetchJson(`${API_BASE}/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

async function deleteAnswer(answerId) {
    await fetchJson(`${API_BASE}/answers/${answerId}`, {
        method: 'DELETE'
    });
}

async function getAnswersForQuestion(questionId) {
    return await fetchJson(`${API_BASE}/questions/${questionId}/answers`);
}

async function getAnswersCount(questionId) {
    const answers = await getAnswersForQuestion(questionId);
    return answers.length;
}

/* ========== UI ELEMENTS ========== */

const app = document.getElementById('app');
const newQuestionBtn = document.getElementById('newQuestionBtn');
const newQuestionModal = document.getElementById('newQuestionModal');
const closeModal = document.getElementById('closeModal');
const cancelQuestion = document.getElementById('cancelQuestion');
const newQuestionForm = document.getElementById('newQuestionForm');

const answerModal = document.getElementById('answerModal');
const closeAnswerModal = document.getElementById('closeAnswerModal');
const cancelAnswer = document.getElementById('cancelAnswer');
const answerForm = document.getElementById('answerForm');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

const questionsContainer = document.getElementById('questionsContainer');

const questionTitle = document.getElementById('questionTitle');
const questionContent = document.getElementById('questionContent');
const questionCategory = document.getElementById('questionCategory');
const questionAuthor = document.getElementById('questionAuthor');

const answerContent = document.getElementById('answerContent');
const answerAuthor = document.getElementById('answerAuthor');

let currentEditingQuestionId = null;

/* ========== CHARACTER COUNTERS ========== */

questionTitle.addEventListener('input', (e) => {
    document.getElementById('titleCount').textContent = e.target.value.length;
});

questionContent.addEventListener('input', (e) => {
    document.getElementById('contentCount').textContent = e.target.value.length;
});

answerContent.addEventListener('input', (e) => {
    document.getElementById('answerCount').textContent = e.target.value.length;
});

/* ========== MODAL MANAGEMENT ========== */

function openNewQuestionModal() {
    newQuestionForm.reset();
    document.getElementById('titleCount').textContent = '0';
    document.getElementById('contentCount').textContent = '0';
    newQuestionModal.classList.remove('hidden');
    questionTitle.focus();
}

function closeNewQuestionModal() {
    newQuestionModal.classList.add('hidden');
}

function openAnswerModal(questionId) {
    currentEditingQuestionId = questionId;
    answerForm.reset();
    document.getElementById('answerCount').textContent = '0';
    answerModal.classList.remove('hidden');
    answerContent.focus();
}

function closeAnswerModal() {
    answerModal.classList.add('hidden');
    currentEditingQuestionId = null;
}

newQuestionBtn.addEventListener('click', openNewQuestionModal);
closeModal.addEventListener('click', closeNewQuestionModal);
cancelQuestion.addEventListener('click', closeNewQuestionModal);
closeAnswerModal.addEventListener('click', closeAnswerModal);
cancelAnswer.addEventListener('click', closeAnswerModal);

// Close modals on overlay click
document.addEventListener('click', (e) => {
    if (e.target === newQuestionModal) closeNewQuestionModal();
    if (e.target === answerModal) closeAnswerModal();
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNewQuestionModal();
        closeAnswerModal();
    }
});

/* ========== FORM SUBMISSION ========== */

newQuestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = questionTitle.value.trim();
    const content = questionContent.value.trim();
    const author = questionAuthor.value.trim();
    const category = questionCategory.value;

    if (!title || !content || !category) {
        alert('Si us plau, completa els camps obligatoris');
        return;
    }

    try {
        await createQuestion(title, content, author, category);
        closeNewQuestionModal();
        await renderQuestions();
    } catch (error) {
        alert('Error en crear la pregunta: ' + error.message);
    }
});

answerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = answerContent.value.trim();
    const author = answerAuthor.value.trim();

    if (!content || !currentEditingQuestionId) {
        alert('Si us plau, escriu una resposta');
        return;
    }

    try {
        await createAnswer(currentEditingQuestionId, content, author);
        closeAnswerModal();
        await renderQuestions();
    } catch (error) {
        alert('Error en crear la resposta: ' + error.message);
    }
});

/* ========== FILTERING & SEARCH ========== */

async function getFilteredAndSortedQuestions(questions, answers) {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const status = statusFilter.value;
    const sort = sortFilter.value;

    let filtered = questions.filter(q => {
        const matchesSearch = !search || 
            q.title.toLowerCase().includes(search) || 
            q.content.toLowerCase().includes(search) ||
            q.author.toLowerCase().includes(search);
        
        const matchesCategory = !category || q.category === category;
        const matchesStatus = !status || q.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'mostAnswers') {
        filtered.sort((a, b) => {
            const countA = answers.filter(answer => answer.questionId === a.id).length;
            const countB = answers.filter(answer => answer.questionId === b.id).length;
            return countB - countA;
        });
    } else {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
}

searchInput.addEventListener('input', () => renderQuestions().catch(console.error));
categoryFilter.addEventListener('change', () => renderQuestions().catch(console.error));
statusFilter.addEventListener('change', () => renderQuestions().catch(console.error));
sortFilter.addEventListener('change', () => renderQuestions().catch(console.error));

clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = '';
    statusFilter.value = '';
    sortFilter.value = 'recent';
    renderQuestions().catch(console.error);
});

/* ========== RENDERING ========== */

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
}

function formatDate(dateString) {
    return dayjs(dateString).fromNow();
}

function renderAnswers(questionAnswers) {
    if (!questionAnswers.length) {
        return '<p class="muted">Sense respostes encara</p>';
    }

    let html = `<div class="answers-list">`;
    questionAnswers.forEach(answer => {
        html += `
            <div class="answer-card">
                <div class="answer-meta">
                    <strong>${escapeHtml(answer.author)}</strong>
                    <span>${formatDate(answer.createdAt)}</span>
                </div>
                <div class="answer-content">${escapeHtml(answer.content)}</div>
                <button class="answer-delete-btn" onclick="handleDeleteAnswer('${answer.id}')" title="Eliminar resposta">Eliminar</button>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

async function handleDeleteQuestion(questionId) {
    if (confirm('Segur que vols eliminar aquesta pregunta? S\'eliminaràn totes les respostes.')) {
        try {
            await deleteQuestion(questionId);
            await renderQuestions();
        } catch (error) {
            alert('Error eliminant la pregunta: ' + error.message);
        }
    }
}

async function handleDeleteAnswer(answerId) {
    if (confirm('Segur que vols eliminar aquesta resposta?')) {
        try {
            await deleteAnswer(answerId);
            await renderQuestions();
        } catch (error) {
            alert('Error eliminant la resposta: ' + error.message);
        }
    }
}

async function handleToggleStatus(questionId) {
    try {
        const questions = await loadQuestions();
        const q = questions.find(q => q.id === questionId);
        if (q) {
            const newStatus = q.status === 'solved' ? 'unsolved' : 'solved';
            await updateQuestionStatus(questionId, newStatus);
            await renderQuestions();
        }
    } catch (error) {
        alert('Error canviant l\'estat: ' + error.message);
    }
}

async function renderQuestions() {
    try {
        const [questions, answers] = await Promise.all([loadQuestions(), loadAnswers()]);
        const filteredQuestions = await getFilteredAndSortedQuestions(questions, answers);

        if (!filteredQuestions.length) {
            questionsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>😕 Sense preguntes</h3>
                    <p>No hi ha preguntes que coincideixin amb els filtres actuals.</p>
                    <p>Sé el primer en fer una pregunta!</p>
                </div>
            `;
            return;
        }

        const html = filteredQuestions.map(question => {
            const questionAnswers = answers.filter(answer => answer.questionId === question.id);
            const answerCount = questionAnswers.length;
            const statusBadge = question.status === 'solved'
                ? '<span class="question-status-badge solved">✓ RESOLTA</span>'
                : '<span class="question-status-badge unsolved">⊘ SENSE RESOLDRE</span>';

            return `
                <div class="question-card" id="question-${question.id}">
                    <div class="question-header">
                        <h3 class="question-title">${escapeHtml(question.title)}</h3>
                        ${statusBadge}
                    </div>

                    <div class="question-meta">
                        <div class="question-meta-item author">${escapeHtml(question.author)}</div>
                        <div class="question-meta-item category">${escapeHtml(question.category)}</div>
                        <div class="question-meta-item date">${formatDate(question.createdAt)}</div>
                        <div class="question-meta-item answers">${answerCount} ${answerCount === 1 ? 'resposta' : 'respostes'}</div>
                    </div>

                    <div class="question-content">${escapeHtml(question.content)}</div>

                    <div class="question-footer">
                        <button class="question-btn question-btn-answer" onclick="handleOpenAnswerModal('${question.id}')">💬 Respondre</button>
                        <button class="question-btn ${question.status === 'solved' ? 'question-btn-unresolve' : 'question-btn-resolve'}" onclick="handleToggleStatus('${question.id}')">
                            ${question.status === 'solved' ? '↩ Marcar com no resolta' : '✓ Marcar com resolta'}
                        </button>
                        <button class="question-btn question-btn-delete" onclick="handleDeleteQuestion('${question.id}')">🗑 Eliminar</button>
                    </div>

                    <div class="answers-section">
                        <h4 class="answers-title">Respostes (${answerCount})</h4>
                        ${renderAnswers(questionAnswers)}
                    </div>
                </div>
            `;
        }).join('');

        questionsContainer.innerHTML = html;
    } catch (error) {
        questionsContainer.innerHTML = `
            <div class="empty-state">
                <h3>⚠️ Error carregant preguntes</h3>
                <p>${escapeHtml(error.message)}</p>
            </div>
        `;
    }
}

// Make functions globally accessible for onclick handlers
window.handleDeleteQuestion = handleDeleteQuestion;
window.handleDeleteAnswer = handleDeleteAnswer;
window.handleToggleStatus = handleToggleStatus;
window.handleOpenAnswerModal = function(questionId) {
    openAnswerModal(questionId);
};

/* ========== INITIALIZATION ========== */

// Simulate loading state
setTimeout(() => {
    renderQuestions();
}, 300);

// Load preferences for font and colors (if set in main app)
function applyStyleFromStorage() {
    const s = JSON.parse(localStorage.getItem('estudi_style_v1') || '{}');
    
    if (s.font) {
        if (s.font === 'Montserrat') {
            document.body.style.fontFamily = "'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        } else if (s.font === 'Inter') {
            document.body.style.fontFamily = "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        } else if (s.font === 'Roboto Slab') {
            document.body.style.fontFamily = "'Roboto Slab', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";
        }
    }

    if (s.bg1 && s.bg2) {
        document.documentElement.style.setProperty('--bg-start', s.bg1);
        document.documentElement.style.setProperty('--bg-end', s.bg2);
    }
}

applyStyleFromStorage();

// Expose core data layer functions globally so external tester pages can access them.
window.loadQuestions = loadQuestions;
window.loadAnswers = loadAnswers;
window.createQuestion = createQuestion;
window.createAnswer = createAnswer;
window.deleteQuestion = deleteQuestion;
window.deleteAnswer = deleteAnswer;
window.updateQuestionStatus = updateQuestionStatus;
window.getAnswersForQuestion = getAnswersForQuestion;
window.getAnswersCount = getAnswersCount;
