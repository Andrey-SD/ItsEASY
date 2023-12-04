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

function StopwatchTest() {
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

const stopwatchTest = new StopwatchTest(timeLimit);
const progresStep = 1;


document.addEventListener("DOMContentLoaded", () => {

	// let currenetTest = ;

	const blockStep1 = document.getElementsByClassName(step1_blockClassName)[0];
	const blockStep2 = document.getElementsByClassName(step2_BlockClassName)[0];
	const blockStep3 = document.getElementsByClassName(step3_BlockClassName)[0];

	const button = document.querySelector('[href="#start-test"]');
	const stopWatch = document.getElementsByClassName('uc-stopwatch')[0];
	const stopWatchDisplay = stopWatch.querySelector('b');

	button.addEventListener('click', (e) => {
		e.preventDefault();
		if (!stopwatchTest.isRunning) {
			startTest();
		} else {
			stopTest();
		}
	});

	const progresSetState = (stepNumber) => {
		switch (stepNumber) {
			case 1:
				blockStep1.style.display = 'block';
				blockStep2.style.display = 'none';
				blockStep3.style.display = 'none';
				stopWatch.style.display = 'none';
				button.textContent = buttonTextStep1;
				console.log(stepNumber);
				break;

			case 2:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'block';
				blockStep3.style.display = 'none';
				stopWatch.style.display = 'block';
				button.textContent = buttonTextStep2;
				console.log(stepNumber);
				break;

			case 3:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'none';
				stopWatch.style.display = 'none';
				blockStep3.style.display = 'block';
				button.style.display = 'none';
				console.log(stepNumber);
				break;
			default:
				break;
		}
	}

	const startTest = () => {
		//обернуть в коллбек
		const allTest = getAllText();
		console.log(getRandomTest(allTest));
		stopwatchTest.timerStart();
		progresSetState(2);
		printTimer();
	}

	const stopTest = () => {
		stopwatchTest.timerStop();
		progresSetState(3);
		printQuetion(0);
	};

	const printTimer = () => {
		setInterval(() => {
			if (stopwatchTest.isRunning) {
				const date = new Date(0);
				date.setSeconds(stopwatchTest.timer);
				const timeString = date.toISOString().substring(14, 19);
				stopWatchDisplay.textContent = timeString;
				if (stopwatchTest.timer >= timeLimit) {
					stopTest();
				}
			}
		}, 1000);
	}

	const getRandomTest = (testArray, filter = '') => {
		console.log(testArray);
		if (filter != '') {
			testArray = testArray.filter(test => test.category == filter);
		}
		const rand = Math.floor(Math.random() * testArray.length);
		return testArray[rand];
	}

	const printQuetion = (questionNumber) => {
		console.log('questionNumber');
	}

	(function init() {
		stopWatchDisplay.textContent = '00:00';
		blockStep3.querySelector('a.js-sendvote-btn').parentElement.style.display = 'none';
		progresSetState(1);
	}());
});
