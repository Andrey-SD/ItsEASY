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

let defaultTexts = [
    {
        textTitle: `Дуб-пастух`,
        textValue: `На узліссі стоїть самотній дуб. Міцний, кремезний. Старий, мов дід-пастух. Мабуть, і виріс він на узліссі, щоб бачити, як ростуть його побратими в лісі. Та ось налетіла гроза. Вдарила вогняна стріла у стовбур дуба. Затремтіли гілки. Загорілось верховіття. Лив дощ, а дуб горів — аж палахкотів... Обгоріла його вершина. Засумував ліс — хто ж тепер буде нашим пастухом? Але дуб не загинув. Через рік зазеленіли молоді пагони, де обгоріли гілки. Вкрився старий дуб кучерявим листям. А вершина була суха. Летіли з теплого краю лелеки. Бачать — сухе верховіття. Сіли на нього й змостили там гніздо. Зрадів старий дуб. Тепер він не самотній. Коли заходить сонце, лелека стоїть у гнізді на одній нозі й дивиться кудись далеко-далеко. Туди, де сховалося сонечко. Це він видивляється, чи не буде часом грози. Спокійно стоїть лелека. І дуб зітхає спокійно. Зашумить зеленим листям і засинає.`,
        category: 'Дорослі',
        questions: [
            {
                question: 'Що стоїть на узліссі?',
                trueAnswer: 2,
                answers: [
                    'Самотній ясен',
                    'Самотній дуб',
                    'Самотній клен'
                ]
            }
            ,
            {
                question: 'Який він?',
                trueAnswer: 3,
                answers: [
                    'міцний, великий',
                    'міцний, сильний',
                    'міцний, кремезний'
                ]
            },
            {
                question: 'На кого він схожий?',
                trueAnswer: 1,
                answers: [
                    'на діда-пастуха',
                    'на діда-веселуна',
                    'на діда-казкаря'
                ]
            },
            {
                question: 'Доповни: «Він виріс на узліссі, щоб бачити, як ростуть...»',
                trueAnswer: 3,
                answers: [
                    'інші дерева',
                    'його друзі',
                    'його побратими'
                ]
            },
            {
                question: 'Що раптом налетіло?',
                trueAnswer: 3,
                answers: [
                    'вітер',
                    'туман',
                    'гроза'
                ]
            },
            {
                question: 'Що трапилося з деревом? ',
                trueAnswer: 3,
                answers: [
                    'воно підросло',
                    'воно зраділо',
                    'воно згоріло'
                ]
            },
            {
                question: 'Як відчував себе ліс?',
                trueAnswer: 2,
                answers: [
                    'радів',
                    'сумував',
                    'переживав'
                ]
            },
            {
                question: 'Який вигляд мало дерево через рік?',
                trueAnswer: 1,
                answers: [
                    'вкрився кучерявим листям',
                    'вкрилося мохом',
                    'засохло'
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

const getAllText = () => {
    const http = false;
    if (http) {
        return parseHTML(htmlString);
    } else {
        return defaultTexts;
    }
}
