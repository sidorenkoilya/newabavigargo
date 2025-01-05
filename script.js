// Отримуємо елементи форми та кнопку відправлення
document.getElementById('sendToTelegram').addEventListener('click', function () {
    // Новий токен та chat_id
    const token = "7820275286:AAHi1Xf15S6-LFKMqTjf2OyVXxpcQrJN8wg"; // Ваш новий токен
    const chat_id = "514960128"; // Ваш Chat ID
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Збираємо дані з форми
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const comment = document.getElementById('comment').value.trim();

    // Перевірка заповненості обов'язкових полів
    if (!name || !phone || !service) {
        alert("Будь ласка, заповніть усі обов'язкові поля!");
        return;
    }

    // Формуємо текст повідомлення
    const message = `
<b>Нова заявка:</b>
Ім'я: ${name}
Телефон: ${phone}
Послуга: ${service}
Коментар: ${comment || "Без коментарів"}
    `;

    // Лог для перевірки, що відправляється
    console.log("Дані для відправлення:", {
        chat_id: chat_id,
        text: message,
    });

    // Відправка даних на Telegram API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: "HTML", // Включаємо HTML для форматування
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Відповідь Telegram:", data);
            if (data.ok) {
                alert("Заявка успішно відправлена!");
                document.getElementById('application-form').reset(); // Очищення форми
            } else {
                alert("Помилка при відправленні заявки. Спробуйте пізніше.");
            }
        })
        .catch(error => {
            console.error("Помилка при відправленні:", error);
            alert("Не вдалося відправити заявку. Перевірте підключення до інтернету.");
        });
});