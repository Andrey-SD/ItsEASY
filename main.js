// ******************************************************
//  Значення у цій секції можна редагувати в залежності 
//  від корситувацьких потреб.
//  Текст у лапках є дописом до відповідних елементів.
//  Текст можна змінювати. (!!! Лапки НЕ ВИДАЛЯТИ !!!!!)
// ******************************************************


const buttonTextStep1 = '   Почати тест ';  //Текст для кнонки початку тесту
const buttonTextStep2 = '   Прочитав    ';  //Текст для кнопки коли користувач завершив читання
const buttonTextStep3 = '   Повторити    ';  //Текст для кнопки коли користувач хоче повторити тест
const timeLimit = 10;   //Максимальний час для проходження тесту(сек);


// ******************************************************
//  Далі змінювати не можна
// ******************************************************


// ******************************************************
//  Добавить исключения на переменые, есть они или нет
// ******************************************************

function speedWriteTest(timeLimit) {
    this.intervalID = undefined;
    this.timer = 0;
    this.isRunning = false;

    this.timerCount = () => {
        if (this.isRunning) {
            this.timer++;
        } else {
            this.timer = 0;
            console.warn('Timer is stoped');
        }
    }

    this.timerStop = () => {
        this.isRunning = false;
    }

    this.timerStart = () => {
        this.isRunning = true;
        this.intervalID = setInterval(() => {
            this.timerCount();
        }, 1000);
    }

    this.testReset = function () {
        this.intervalID = undefined;
        this.timer = 0;
        this.isRunning = false;
    }
}

const writeTest = new speedWriteTest(timeLimit);


document.addEventListener("DOMContentLoaded", () => {

    const blockStep1 = document.getElementsByClassName('uc-blockStep-1')[0];
    const blockStep2 = document.getElementsByClassName('uc-blockStep-2')[0];

    const button = document.querySelector('[href="start-test"]');
    button.textContent = buttonTextStep1;

    const stopWatchDisplay = document.getElementsByClassName('uc-stopwatch')[0];
    stopWatchDisplay.textContent = '00:00';

    blockStep2.style.display = 'none';

    button.addEventListener('click', (e) => {
        e.preventDefault();
        blockStep1.style.display = 'none';
        if (!writeTest.isRunning) {
            console.log('run');
            startTest();
        } else {
            stopTest();
            console.log('stop');
        }
    });

    const startTest = () => {
        writeTest.timerStart();
        blockStep2.style.display = 'block';
        button.textContent = buttonTextStep2;
        drawTimer();
    }

    const stopTest = () => {
        writeTest.timerStop();
        button.textContent = buttonTextStep3;
    };

    const drawTimer = function (str) {
        setInterval(() => {
            if (writeTest.isRunning) {
                const date = new Date(0);
                date.setSeconds(writeTest.timer);
                const timeString = date.toISOString().substring(14, 19);
                stopWatchDisplay.textContent = timeString;
                if (writeTest.timer >= timeLimit) {
                    stopTest();
                }
            }
        }, 1000);

    }
});