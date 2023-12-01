// ******************************************************
//  Значення у цій секції можна редагувати в залежності 
//  від корситувацьких потреб.
//  Текст у лапках є дописом до відповідних елементів.
//  Текст можна змінювати. (!!! Лапки НЕ ВИДАЛЯТИ !!!!!)
//  Відступи не мають значення
// ******************************************************

const htmlString = `
<pre class="writeTest-container">
    <p class="category">Дорослі</p>
    <p class="text-value">
        Текст1
    </p>
    <div class="quetions-container">
        <p class="quetion-value">
            Питання 1 до Текст 1
        </p>
        <p class="unswer-item">
            Варіант 1 до Питання 1
        </p>
        <p class="unswer-item">
            Варіант 2 до Питання 1
        </p>
        <p class="unswer-item">
            Варіант 3 до Питання 1
        </p>
    </div>
    <div class="quetions-container">
        <p class="quetion-value">
            Питання 2 до Текст 1
        </p>
        <p class="unswer-item">
            Варіант 1 до Питання 2
        </p>
        <p class="unswer-item">
            Варіант 2 до Питання 2
        </p>
        <p class="unswer-item">
            Варіант 3 до Питання 2
        </p>
    </div>
</pre>

<pre class="writeTest-container">
    <p class="category">Діти</p>
    <p class="text-value">
        Текст2
    </p>
    <div class="quetions-container">
        <p class="quetion-value">
            Питання 1 до Текст 1
        </p>
        <p class="unswer-item">
            Варіант 1 до Питання 1
        </p>
        <p class="unswer-item">
            Варіант 2 до Питання 1
        </p>
        <p class="unswer-item">
            Варіант 3 до Питання 1
        </p>
    </div>
    <div class="quetions-container">
        <p class="quetion-value">
            Питання 2 до Текст 1
        </p>
        <p class="unswer-item">
            Варіант 1 до Питання 2
        </p>
        <p class="unswer-item">
            Варіант 2 до Питання 2
        </p>
        <p class="unswer-item">
            Варіант 3 до Питання 2
        </p>
    </div>
</pre>
`;

const parseHTML = (strHTML) => {
    // Створюємо тимчасовий контейнер для парсингу HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = strHTML;

    // Отримуємо всі тексти
    const writeTests = tempContainer.querySelectorAll('.writeTest-container');

    // Створюємо масив об'єктів для зберігання даних
    const allWriteTest = [];

    writeTests.forEach((writeTest) => {
        const writeTestObj = {};
        writeTestObj.questions = [];
        writeTestObj.textValue = writeTest.querySelector('.text-value').textContent.trim();
        writeTestObj.category = writeTest.querySelector('.category').textContent.trim();

        // Отримуємо всі контейнери питань
        const questionContainers = writeTest.querySelectorAll('.quetions-container');

        // Ітеруємося по кожному контейнеру питань
        questionContainers.forEach(function (questionContainer) {
            const questionObject = {
                question: questionContainer.querySelector('.quetion-value').textContent.trim(),
                answers: [],
            };

            // Отримуємо всі варіанти відповідей в поточному контейнері
            const answerItems = questionContainer.querySelectorAll('.unswer-item');

            // Ітеруємося по кожному варіанту відповіді
            answerItems.forEach(function (answerItem) {
                questionObject.answers.push(answerItem.textContent.trim());
            });

            // Додаємо поточний об'єкт до масиву результатів
            writeTestObj.questions.push(questionObject);
        });
        allWriteTest.push(writeTestObj);
    });
    return allWriteTest;
};

console.log(parseHTML(htmlString));