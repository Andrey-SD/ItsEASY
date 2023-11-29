// ******************************************************
//  Значення у цій секції можна редагувати в залежності 
//  від корситувацьких потреб.
//  Текст у лапках є дописом до відповідних елементів.
//  Текст можна змінювати. (!!! Лапки НЕ ВИДАЛЯТИ !!!!!)
//  Відступи не мають значення
// ******************************************************


const buttonTextStep1 = '	Почати тест	';  //Текст для кнонки початку тесту
const buttonTextStep2 = '	Прочитав	';  	//Текст для кнопки коли користувач завершив читання
const buttonTextStep3 = '	Повторити	';  	//Текст для кнопки коли користувач хоче повторити тест
const buttonTextStep4 = '	Повторити	';  	//Текст для кнопки коли користувач хоче повторити тест
const timeLimit = 10;   									//Максимальний час для проходження тесту(сек);


const step1_blockClassName = 'uc-blockStep-1';	//Ім'я класу для блоку першого кроку
const step2_BlockClassName = 'uc-blockStep-2';	//Ім'я класу для блоку другого кроку
const step3_BlockClassName = 'uc-blockStep-3';	//Ім'я класу для блоку третього кроку


// ******************************************************
//  Далі змінювати не можна
// ******************************************************


// ******************************************************
//  Добавить исключения на переменые, есть они или нет
// ******************************************************

function speedWriteTest() {
	let intervalID = undefined;
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
		clearInterval(intervalID);
	}

	this.timerStart = () => {
		this.timer = 0;
		this.isRunning = true;
		intervalID = setInterval(() => {
			this.timerCount();
		}, 1000);
	}

	// this.reset = function () {
	//     intervalID = undefined;
	//     this.timer = 0;
	//     this.isRunning = false;
	// }
}

const writeTest = new speedWriteTest(timeLimit);
const progresStep = 1;


document.addEventListener("DOMContentLoaded", () => {

	const blockStep1 = document.getElementsByClassName(step1_blockClassName)[0];
	const blockStep2 = document.getElementsByClassName(step2_BlockClassName)[0];
	const blockStep3 = document.getElementsByClassName(step3_BlockClassName)[0];

	const button = document.querySelector('[href="#start-test"]');
	const stopWatch = document.getElementsByClassName('uc-stopwatch')[0];
	const stopWatchDisplay = stopWatch.querySelector('b');

	button.addEventListener('click', (e) => {
		e.preventDefault();
		if (!writeTest.isRunning) {
			startTest();
		} else {
			stopTest();
		}
	});

	const progresSetStep = (stepNumber) => {
		switch (stepNumber) {
			case 1:
				blockStep1.style.display = 'block';
				blockStep2.style.display = 'none';
				blockStep3.style.display = 'none';
				stopWatch.style.display = 'none';
				button.textContent = buttonTextStep1;
				break;

			case 2:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'block';
				blockStep3.style.display = 'none';
				stopWatch.style.display = 'block';
				button.textContent = buttonTextStep2;
				break;
			case 3:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'none';
				stopWatch.style.display = 'none';
				blockStep3.style.display = 'block';
				button.style.display = 'none';
				break;
			default:
				break;
		}
	}

	const startTest = () => {
		writeTest.timerStart();
		progresSetStep(2);
		drawTimer();
	}

	const stopTest = () => {
		writeTest.timerStop();
		progresSetStep(3);
	};

	const drawTimer = () => {
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

	(function init() {
		stopWatchDisplay.textContent = '00:00';
		blockStep3.querySelector('a.js-sendvote-btn').parentElement.style.display = 'none';
		progresSetStep(1);
	}());
});
