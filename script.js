let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Carregar as perguntas do arquivo JSON
fetch('perguntas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        questions = shuffleArray(data); // Embaralha as perguntas
        displayQuestion(); // Exibe a primeira pergunta
    })
    .catch(error => {
        console.error("Erro ao carregar as perguntas:", error); // Depuração
    });

// Função para embaralhar o array de perguntas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];

    // Limpar conteúdo anterior
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <div class="options">
            ${question.options.map((option, index) => 
                `<button onclick="checkAnswer(${index})">${option}</button>`
            ).join('')}
        </div>
        <button id="skip-button" onclick="skipQuestion()">Pular pergunta</button>
    `;
}

function checkAnswer(selectedOptionIndex) {
    const correctAnswerIndex = questions[currentQuestionIndex].answer;
    const questionContainer = document.getElementById('question-container');
    const skipButton = document.getElementById('skip-button');
    
    // Esconde o botão "Pular pergunta" assim que a resposta for selecionada
    skipButton.style.display = 'none';

    // Verificar se a resposta foi correta ou não
    const isCorrect = selectedOptionIndex === correctAnswerIndex;
    const correctAnswer = questions[currentQuestionIndex].options[correctAnswerIndex];

    // Atualiza o score
    if (isCorrect) {
        score++;
    }

    // Exibir feedback
    questionContainer.innerHTML += `
        <p class="feedback-message">${isCorrect ? 'Você acertou!' : 'Você errou!'}</p>
        <p><strong>Resposta correta:</strong> ${correctAnswer}</p>
        <button id="next-button" onclick="nextQuestion()">Próxima pergunta</button>
    `;
}

function skipQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Exibir a próxima pergunta
    } else {
        showResult(); // Mostrar o resultado final
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Exibir a próxima pergunta
    } else {
        showResult(); // Mostrar o resultado final
    }
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result');
    const scoreContainer = document.getElementById('score');

    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreContainer.textContent = `Você acertou ${score} de ${questions.length} questões.`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleArray(questions); // Embaralha as perguntas novamente
    document.getElementById('result').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    displayQuestion();
}
function getQuestionsByTheme(theme) {
    return questions.filter(question => question.theme === theme);
}
