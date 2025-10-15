document.addEventListener('DOMContentLoaded', function() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('sendButton');
    const errorMessage = document.getElementById('error-message');

    // Foca no campo de número ao abrir a extensão
    phoneNumberInput.focus();

    // Adiciona o evento de clique no botão
    sendButton.addEventListener('click', openWhatsApp);
    
    // Adiciona evento de 'Enter' nos campos para enviar
    phoneNumberInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            openWhatsApp();
        }
    });

    messageInput.addEventListener('keydown', (event) => {
        // Permite o 'Enter' para pular linha com Shift
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Impede a quebra de linha
            openWhatsApp();
        }
    });


    function openWhatsApp() {
        let phoneNumber = phoneNumberInput.value;
        const message = messageInput.value;
        
        // Limpa qualquer mensagem de erro anterior
        errorMessage.textContent = '';
        phoneNumberInput.style.borderColor = '#ccc';

        // Remove caracteres não numéricos do telefone
        phoneNumber = phoneNumber.replace(/\D/g, '');

        // Validação básica do número
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            errorMessage.textContent = 'Número inválido. Use DDD + Número.';
            phoneNumberInput.style.borderColor = '#d32f2f';
            phoneNumberInput.focus();
            return;
        }

        // Codifica a mensagem para a URL
        const encodedMessage = encodeURIComponent(message);
        
        // --- ALTERAÇÃO PRINCIPAL AQUI ---
        // Monta a URL do WhatsApp usando o link 'wa.me', que é mais confiável.
        // Adiciona o código do Brasil (55)
        const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodedMessage}`;

        // Abre a nova aba
        chrome.tabs.create({ url: whatsappUrl });
    }
});

