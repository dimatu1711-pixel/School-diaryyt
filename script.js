```javascript
// Функція для входу в щоденник
function enterDiary() {
    const userName = document.getElementById('userName').value;
    
    if (userName.trim() === '') {
        alert('Будь ласка, введіть ваше імʼя!');
        return;
    }
    
    // Зберігаємо ім'я користувача
    localStorage.setItem('userName', userName);
    
    // Переходимо до основного екрану
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('diary-screen').classList.add('active');
    document.getElementById('greeting').textContent = userName;
    
    // Завантажуємо оцінки
    loadGrades();
}

// Функція для виходу
function logout() {
    document.getElementById('diary-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('userName').value = '';
}

// Функція для додавання оцінки
function addGrade() {
    const subject = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    
    if (subject.trim() === '' || grade === '') {
        alert('Будь ласка, заповніть всі поля!');
        return;
    }
    
    // Отримуємо поточні оцінки
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    
    // Додаємо нову оцінку
    grades.push({
        subject: subject,
        grade: grade,
        date: new Date().toLocaleDateString()
    });
    
    // Зберігаємо оцінки
    localStorage.setItem('grades', JSON.stringify(grades));
    
    // Оновлюємо список
    loadGrades();
    
    // Очищаємо поля вводу
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = '';
}

// Функція для завантаження оцінок
function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const gradesList = document.getElementById('grades');
    
    gradesList.innerHTML = '';
    
    if (grades.length === 0) {
        gradesList.innerHTML = '<li>Ще немає оцінок</li>';
        return;
    }
    
    grades.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'grade-item';
        li.innerHTML = `
            <span class="grade-subject">${item.subject}</span>
            <div>
                <span class="grade-value">${item.grade}</span>
                <small style="margin-left: 10px; color: #666;">${item.date}</small>
            </div>
        `;
        gradesList.appendChild(li);
    });
}

// Перевіряємо, чи користувач вже входив
window.onload = function() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('diary-screen').classList.add('active');
        document.getElementById('greeting').textContent = savedName;
        loadGrades();
    }
};
```
