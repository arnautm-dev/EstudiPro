/* ========== DATA LAYER ========== */

const LS_QUESTIONS_KEY = 'comunitat_questions_v1';
const LS_ANSWERS_KEY = 'comunitat_answers_v1';
const CATEGORIES = [
    'Matemàtiques',
    'Programació',
    'Idiomes',
    'Ciència',
    'Altres'
];

// Load all questions from localStorage
function loadQuestions() {
    try {
        const q = JSON.parse(localStorage.getItem(LS_QUESTIONS_KEY) || '[]');
        return Array.isArray(q) ? q : [];
    } catch (e) {
        return [];
    }
}

// Load all answers from localStorage
function loadAnswers() {
    try {
        const a = JSON.parse(localStorage.getItem(LS_ANSWERS_KEY) || '[]');
        return Array.isArray(a) ? a : [];
    } catch (e) {
        return [];
    }
}

// Save questions to localStorage
function saveQuestions(questions) {
    localStorage.setItem(LS_QUESTIONS_KEY, JSON.stringify(questions));
}

// Save answers to localStorage
function saveAnswers(answers) {
    localStorage.setItem(LS_ANSWERS_KEY, JSON.stringify(answers));
}

// Create a new question
function createQuestion(title, content, author, category) {
    const questions = loadQuestions();
    const newQuestion = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        author: author.trim() || 'Anònim',
        category: category,
        status: 'unsolved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    questions.push(newQuestion);
    saveQuestions(questions);
    return newQuestion;
}

// Delete a question
function deleteQuestion(questionId) {
    const questions = loadQuestions();
    const filtered = questions.filter(q => q.id !== questionId);
    saveQuestions(filtered);
    const answers = loadAnswers();
    const filteredAnswers = answers.filter(a => a.questionId !== questionId);
    saveAnswers(filteredAnswers);
}

// Update question status
function updateQuestionStatus(questionId, newStatus) {
    const questions = loadQuestions();
    const q = questions.find(q => q.id === questionId);
    if (q) {
        q.status = newStatus;
        q.updatedAt = new Date().toISOString();
        saveQuestions(questions);
    }
}

// Create a new answer
function createAnswer(questionId, content, author) {
    const answers = loadAnswers();
    const newAnswer = {
        id: Date.now().toString(),
        questionId: questionId,
        content: content.trim(),
        author: author.trim() || 'Anònim',
        createdAt: new Date().toISOString()
    };
    answers.push(newAnswer);
    saveAnswers(answers);
    return newAnswer;
}

// Delete an answer
function deleteAnswer(answerId) {
    const answers = loadAnswers();
    const filtered = answers.filter(a => a.id !== answerId);
    saveAnswers(filtered);
}

// Get answers for a question
function getAnswersForQuestion(questionId) {
    const answers = loadAnswers();
    return answers.filter(a => a.questionId === questionId);
}

// Get answers count for a question
function getAnswersCount(questionId) {
    return getAnswersForQuestion(questionId).length;
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

newQuestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = questionTitle.value.trim();
    const content = questionContent.value.trim();
    const author = questionAuthor.value.trim();
    const category = questionCategory.value;

    if (!title || !content || !category) {
        alert('Si us plau, completa els camps obligatoris');
        return;
    }

    createQuestion(title, content, author, category);
    closeNewQuestionModal();
    renderQuestions();
});

answerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = answerContent.value.trim();
    const author = answerAuthor.value.trim();

    if (!content || !currentEditingQuestionId) {
        alert('Si us plau, escriu una resposta');
        return;
    }

    createAnswer(currentEditingQuestionId, content, author);
    closeAnswerModal();
    renderQuestions();
});

/* ========== FILTERING & SEARCH ========== */

function getFilteredAndSortedQuestions() {
    let questions = loadQuestions();
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const status = statusFilter.value;
    const sort = sortFilter.value;

    // Apply filters
    questions = questions.filter(q => {
        const matchesSearch = !search || 
            q.title.toLowerCase().includes(search) || 
            q.content.toLowerCase().includes(search) ||
            q.author.toLowerCase().includes(search);
        
        const matchesCategory = !category || q.category === category;
        const matchesStatus = !status || q.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Apply sorting
    if (sort === 'oldest') {
        questions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'mostAnswers') {
        questions.sort((a, b) => getAnswersCount(b.id) - getAnswersCount(a.id));
    } else {
        // 'recent' by default
        questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return questions;
}

searchInput.addEventListener('input', renderQuestions);
categoryFilter.addEventListener('change', renderQuestions);
statusFilter.addEventListener('change', renderQuestions);
sortFilter.addEventListener('change', renderQuestions);

clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = '';
    statusFilter.value = '';
    sortFilter.value = 'recent';
    renderQuestions();
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

function renderAnswers(questionId) {
    const answers = getAnswersForQuestion(questionId);
    
    if (!answers.length) {
        return '<p class="muted">Sense respostes encara</p>';
    }

    let html = `<div class="answers-list">`;
    answers.forEach(answer => {
        html += `
            <div class="answer-card">
                <div class="answer-meta">
                    <strong>${escapeHtml(answer.author)}</strong>
                    <span>${formatDate(answer.createdAt)}</span>
                </div>
                <div class="answer-content">${escapeHtml(answer.content)}</div>
                <button class="answer-delete-btn" onclick="handleDeleteAnswer('${answer.id}', '${questionId}')" title="Eliminar resposta">Eliminar</button>
            </div>
        `;
    });
    html += '</div>';
    
    return html;
}

function handleDeleteQuestion(questionId) {
    if (confirm('Segur que vols eliminar aquesta pregunta? S\'eliminaràn totes les respostes.')) {
        deleteQuestion(questionId);
        renderQuestions();
    }
}

function handleDeleteAnswer(answerId, questionId) {
    if (confirm('Segur que vols eliminar aquesta resposta?')) {
        deleteAnswer(answerId);
        renderQuestions();
    }
}

function handleToggleStatus(questionId) {
    const questions = loadQuestions();
    const q = questions.find(q => q.id === questionId);
    if (q) {
        const newStatus = q.status === 'solved' ? 'unsolved' : 'solved';
        updateQuestionStatus(questionId, newStatus);
        renderQuestions();
    }
}

function renderQuestions() {
    const questions = getFilteredAndSortedQuestions();

    if (!questions.length) {
        questionsContainer.innerHTML = `
            <div class="empty-state">
                <h3>😕 Sense preguntes</h3>
                <p>No hi ha preguntes que coincideixin amb els filtres actuals.</p>
                <p>Sé el primer en fer una pregunta!</p>
            </div>
        `;
        return;
    }

    let html = '';
    questions.forEach(question => {
        const answers = getAnswersForQuestion(question.id);
        const answerCount = answers.length;
        const statusBadge = question.status === 'solved' 
            ? '<span class="question-status-badge solved">✓ RESOLTA</span>'
            : '<span class="question-status-badge unsolved">⊘ SENSE RESOLDRE</span>';

        html += `
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
                    ${renderAnswers(question.id)}
                </div>
            </div>
        `;
    });

    questionsContainer.innerHTML = html;
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
