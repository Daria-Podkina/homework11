const socket = new WebSocket('ws://localhost:8080');

// Обработчик при установке соединения
socket.addEventListener('open', () => {
    console.log('Соединение установлено');
});

// Обработчик входящих сообщений
socket.addEventListener('message', (event) => {
    const messages = document.getElementById('messages');
    const data = JSON.parse(event.data); // Разбираем JSON

    // Добавляем сообщение с именем пользователя
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(messageElement);

    // Автопрокрутка
    messages.scrollTop = messages.scrollHeight;
});

// Отправка сообщения по клику на кнопку
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');

    const username = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && message) {
        // Отправляем JSON с именем и сообщением
        socket.send(JSON.stringify({ username, message }));

        // Очищаем поле ввода сообщения
        messageInput.value = '';

        // Автопрокрутка
        const messages = document.getElementById('messages');
        messages.scrollTop = messages.scrollHeight;
    }
});







