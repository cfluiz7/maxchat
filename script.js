const chatBox = document.getElementById('chatBox');
const toggleThemeButton = document.getElementById('toggleTheme');

let isFirstMessage = true;

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = text;

    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem para baixo
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    toggleThemeButton.textContent = document.body.classList.contains('dark-theme') ? 'Modo Claro' : 'Modo Escuro';
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage('user', userMessage);
        userInput.value = '';

        let response = 'Desculpe, não entendi sua pergunta.';
        const lowerCaseMessage = userMessage.toLowerCase();

        // Apresentação na primeira interação
        if (isFirstMessage) {
            response = `Olá! Eu sou Maxusel, seu assistente virtual. Posso responder perguntas, contar piadas, fazer cálculos, e muito mais! Pergunte algo ou peça uma dica sobre qualquer assunto.`;
            isFirstMessage = false;
        }

        // Detecção de cálculos matemáticos
        try {
            const mathResult = eval(userMessage);
            if (!isNaN(mathResult)) {
                response = `O resultado é: ${mathResult}`;
            }
        } catch (error) {
            // Continue com as respostas padrão
        }

        // Reconhecimento de saudações
        const greetings = [
            "olá", "oi", "bom dia", "boa tarde", "boa noite", "e aí", "salve", "hello", "hi", "hey",
            "como vai", "tudo bem", "como você está", "fala aí", "saudações"
        ];
        if (greetings.some(greet => lowerCaseMessage.includes(greet))) {
            response = 'Olá! Sou o Maxusel, sua IA. Como posso ajudar?';
        }

        // Resposta engraçada com um toque de humor
        const jokes = [
            "Por que o livro de matemática se suicidou? Porque tinha muitos problemas.",
            "Por que o café foi ao psicólogo? Porque estava com problemas de nervos.",
            "Como o mar atende o telefone? Alôoo!",
            "O que o pato disse para a pata? Vem quá!",
            "Por que a bicicleta não consegue parar em pé? Porque está sem rodinhas!"
        ];
        if (lowerCaseMessage.includes('piada')) {
            response = jokes[Math.floor(Math.random() * jokes.length)];
        }

        // Reconhecimento de perguntas sobre o bot e suas funções
        if (lowerCaseMessage.includes('o que você faz') || lowerCaseMessage.includes('quem é você')) {
            response = 'Eu sou Maxusel, seu assistente virtual. Posso responder perguntas, contar piadas, realizar cálculos simples e conversar sobre diversos tópicos. Pergunte algo!';
        } else if (lowerCaseMessage.includes('qual é o seu nome')) {
            response = 'Meu nome é Maxusel, seu assistente digital!';
        } else if (lowerCaseMessage.includes('o que você sabe fazer')) {
            response = 'Posso responder perguntas, calcular operações matemáticas simples, contar piadas, dar dicas, e conversar sobre vários tópicos! O que você quer saber?';
        } else if (lowerCaseMessage.includes('qual é a sua função')) {
            response = 'Minha função é ajudar e conversar com você! Posso responder dúvidas, contar piadas e muito mais. Como posso ajudar hoje?';
        }

        // Perguntas comuns sobre interesses e hobbies
        if (lowerCaseMessage.includes('livro')) {
            response = 'Você gosta de ler? Recomendo alguns clássicos como "1984" ou "O Alquimista". E você? Qual é o seu gênero favorito?';
        } else if (lowerCaseMessage.includes('música')) {
            response = 'Gosto de todas as músicas! Qual é a sua música ou artista favorito?';
        } else if (lowerCaseMessage.includes('filme')) {
            response = 'Eu adoro ficção científica! Qual foi o último filme que você assistiu?';
        } else if (lowerCaseMessage.includes('viagem')) {
            response = 'Viajar é ótimo para relaxar e conhecer novas culturas! Para onde você gostaria de ir?';
        } else if (lowerCaseMessage.includes('tecnologia') || lowerCaseMessage.includes('inovação')) {
            response = 'A tecnologia está sempre mudando! Você está interessado em alguma novidade específica?';
        } else if (lowerCaseMessage.includes('esporte')) {
            response = 'Qual é o seu esporte favorito? Eu gosto de acompanhar o futebol!';
        } else if (lowerCaseMessage.includes('cozinhar')) {
            response = 'Você gosta de cozinhar? Posso dar algumas sugestões de receitas fáceis e deliciosas!';
        } else if (lowerCaseMessage.includes('saúde') || lowerCaseMessage.includes('bem-estar')) {
            response = 'A saúde é importante! Você está procurando dicas de bem-estar?';
        } else if (lowerCaseMessage.includes('filosofia') || lowerCaseMessage.includes('pensamento')) {
            response = 'A filosofia é fascinante! Existe algum filósofo ou conceito que você gosta?';

        // Perguntas mais amplas
        } else if (lowerCaseMessage.includes('como está o tempo')) {
            response = 'Infelizmente, não tenho acesso a informações em tempo real sobre o clima. Sugiro verificar em um aplicativo de meteorologia!';
        } else if (lowerCaseMessage.includes('o que é amor')) {
            response = 'Ah, o amor! Cada pessoa tem sua definição, mas é aquele sentimento forte e especial por alguém. Como você definiria o amor?';
        } else if (lowerCaseMessage.includes('sentimentos')) {
            response = 'Os sentimentos são uma parte essencial do ser humano! Eles são como mensagens do corpo e da mente, dizendo como reagimos ao mundo ao nosso redor.';
        } else if (lowerCaseMessage.includes('qual é o sentido da vida')) {
            response = 'Essa é uma pergunta profunda! Alguns dizem que é encontrar felicidade, outros acreditam em ajudar o próximo ou buscar conhecimento. Qual é o seu pensamento sobre isso?';
        }

        // Respostas padrão para perguntas não reconhecidas
        if (response === 'Desculpe, não entendi sua pergunta.') {
            const defaultResponses = [
                "Ainda não sei como responder isso, mas posso tentar ajudar de outras maneiras!",
                "Hmm, não tenho uma resposta para isso, mas estou sempre aprendendo!",
                "Essa me pegou! Vamos tentar outra coisa.",
                "Desculpe, não entendi. Tente reformular sua pergunta!",
                "Essa é uma boa pergunta! Vou tentar descobrir para você."
            ];
            response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        appendMessage('bot', response);
    }
}

// Enviar mensagem com a tecla Enter
document.getElementById('userInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Alternar entre temas
toggleThemeButton.addEventListener('click', toggleTheme);
