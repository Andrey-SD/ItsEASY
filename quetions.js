const htmlString = `
<pre class='writeTest-container'>
    <p class=category>Дорослі</p>
    <p class='text-value'>
        Текст 1
    </p>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 1 до Текст 1
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 1 Текст 1
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 1 Текст 1
        </p> 
        <p class='unswer-item'>
            Варіант 3 до Питання 1 Текст 1
        </p>
    </div>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 2 до Текст 1
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 2 Текст 1
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 2 Текст 1
        </p>
        <p class='unswer-item'>
            Варіант 3 до Питання 2 Текст 1
        </p>
    </div>
</pre>

<pre class='writeTest-container'>
    <p class=category>Діти</p>
    <p class='text-value'>
        Текст 2
    </p>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 1 до Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 1 Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 1 Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 3 до Питання 1 Текст 2
        </p>
    </div>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 2 до Текст 1 Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 2 Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 2 Текст 2
        </p>
        <p class='unswer-item'>
            Варіант 3 до Питання 2 Текст 2
        </p>
    </div>
</pre>
<pre class='writeTest-container'>
    <p class=category>Діти</p>
    <p class='text-value'>
        Текст 3
    </p>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 1 до Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 1 Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 1 Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 3 до Питання 1 Текст 3
        </p>
    </div>
    <div class='quetions-container'>
        <p class='quetion-value'>
            Питання 2 до Текст 1 Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 1 до Питання 2 Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 2 до Питання 2 Текст 3
        </p>
        <p class='unswer-item'>
            Варіант 3 до Питання 2 Текст 3
        </p>
    </div>
</pre>
`;

let defaultTexts = [
    {
        textValue: 'Текст 1 Дорослі та підлітки.',
        category: 'Дорослі',
        questions: [
            {
                question: 'Питання 1 до Текст 1',
                trueAnswer: 'Варіант 1 до Питання 1 Текст 1',
                answers: [
                    'Варіант 1 до Питання 1 Текст 1',
                    'Варіант 2 до Питання 1 Текст 1',
                    'Варіант 3 до Питання 1 Текст 1',
                    'Варіант 1 до Питання 1 Текст 1',
                    'Варіант 2 до Питання 1 Текст 1',
                    'Варіант 3 до Питання 1 Текст 1'
                ]
            },
            {
                question: 'Питання 2 до Текст 1',
                trueAnswer: 'Варіант 1 до Питання 2 Текст 1',
                answers: [
                    'Варіант 1 до Питання 2 Текст 1',
                    'Варіант 2 до Питання 2 Текст 1',
                    'Варіант 3 до Питання 2 Текст 1'
                ]
            }
        ]
    },
/*
    {
        questions: [
            {
                question: 'Питання 1 до Текст 2',
                trueAnswer: 'Варіант 1 до Питання 1 Текст 2',
                answers: [
                    'Варіант 1 до Питання 1 Текст 2',
                    'Варіант 2 до Питання 1 Текст 2',
                    'Варіант 3 до Питання 1 Текст 2'
                ]
            },
            {
                question: 'Питання 2 до Текст 1 Текст 2',
                trueAnswer: 'ВВаріант 1 до Питання 2 Текст 2',
                answers: [
                    'Варіант 1 до Питання 2 Текст 2',
                    'Варіант 2 до Питання 2 Текст 2',
                    'Варіант 3 до Питання 2 Текст 2'
                ]
            }
        ],
        textValue: 'Текст 2',
        category: 'Діти'
    },
    {
        questions: [
            {
                question: 'Питання 1 до Текст 3',
                trueAnswer: 'Варіант 1 до Питання 1 Текст 3',
                answers: [
                    'Варіант 1 до Питання 1 Текст 3',
                    'Варіант 2 до Питання 1 Текст 3',
                    'Варіант 3 до Питання 1 Текст 3'
                ]
            },
            {
                question: 'Питання 2 до Текст 1 Текст 3',
                trueAnswer: 'Варіант 1 до Питання 2 Текст 3',
                answers: [
                    'Варіант 1 до Питання 2 Текст 3',
                    'Варіант 2 до Питання 2 Текст 3',
                    'Варіант 3 до Питання 2 Текст 3'
                ]
            }
        ],
        textValue: 'Текст 3',
        category: 'Діти'
    }
*/
];

const parseHTML = (strHTML) => {
    //селектор для блоку, у якому зберігаються тести
    const writeTestСontainer = '.writeTest-container';

    //селектор для елементу, у якому зберігається текст для читання
    const textValue = '.text-value';

    //селектор для елементу, у якому зберігається категорія тестуємого
    const category = '.category';

    //селектор для блоку, у якому зберігаються всі питання
    const quetionsСontainer = '.quetions-container';

    //селектор для елемента, у якому зберігається одне питання
    const quetionValue = '.quetion-value';

    //селектор для елемента, у якому зберігаються варіанти відповідей
    const unswerItem = '.unswer-item';

    // Створюємо тимчасовий контейнер для парсингу HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = strHTML;

    // Отримуємо всі тексти
    const writeTests = tempContainer.querySelectorAll(writeTestСontainer);

    // Створюємо масив об'єктів для зберігання даних
    const allWriteTest = [];

    writeTests.forEach((writeTest) => {
        const writeTestObj = {};
        writeTestObj.questions = [];
        writeTestObj.textValue = writeTest.querySelector(textValue).textContent.trim();
        writeTestObj.category = writeTest.querySelector(category).textContent.trim();

        // Отримуємо всі контейнери питань
        const questionContainers = writeTest.querySelectorAll(quetionsСontainer);

        // Ітеруємося по кожному контейнеру питань
        questionContainers.forEach((element) => {
            const questionObject = {
                question: element.querySelector(quetionValue).textContent.trim(),
                answers: [],
            };

            // Отримуємо всі варіанти відповідей в поточному контейнері
            const answerItems = element.querySelectorAll(unswerItem);

            // Ітеруємося по кожному варіанту відповіді
            answerItems.forEach((element) => {
                questionObject.answers.push(element.textContent.trim());
            });

            // Додаємо поточний об'єкт до масиву результатів
            writeTestObj.questions.push(questionObject);
        });
        allWriteTest.push(writeTestObj);
    });
    return allWriteTest;
};

const getAllText = () => {
    const http = false;
    if (http) {
        return parseHTML(htmlString);
    } else {
        return defaultTexts;
    }
}
