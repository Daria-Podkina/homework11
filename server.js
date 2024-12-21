const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Клиент подключён');

    ws.on('close', () => {
        console.log('Клиент отключён');
        console.log('Событие close сработало');
    });

    ws.on('error', (error) => {
        console.error('Ошибка соединения:', error);
    });

    ws.on('message', (data) => {
        const { username, message } = JSON.parse(data);
        console.log(`Получено сообщение: ${username}: ${message}`);

        // Рассылаем сообщения всем клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ username, message }));
            }
        });
    });

    ws.send(JSON.stringify({ username: 'Сервер', message: 'Добро пожаловать в чат!' }));
    console.log('WebSocket сервер запущен на ws://localhost:8080');
});

