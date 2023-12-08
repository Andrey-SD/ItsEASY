// ******************************************************
//  Значення у цій секції можна редагувати в залежності 
//  від корситувацьких потреб.
//  Текст у лапках є дописом до відповідних елементів.
//  Текст можна змінювати. (!!! Лапки НЕ ВИДАЛЯТИ !!!!!)
//  Відступи не мають значення
// ******************************************************


const buttonTextStep1 = '	Почати тест	';  //Текст для кнонки початку тесту
const buttonTextStep2 = '	Прочитав	';  //Текст для кнопки коли користувач завершив читання
const buttonTextStep3 = '	Повторити	';  //Текст для кнопки коли користувач хоче повторити тест
const buttonTextStep4 = '	Повторити	';  //Текст для кнопки коли користувач хоче повторити тест
const timeLimit = 10;   					//Максимальний час для проходження тесту(сек);


const step1_blockClassName = 'uc-blockStep-1';	//Ім'я класу для блоку першого кроку
const step2_BlockClassName = 'uc-blockStep-2';	//Ім'я класу для блоку другого кроку
const step3_BlockClassName = 'uc-blockStep-3';	//Ім'я класу для блоку третього кроку
const maxLenghtWord = 1;	//Кількість літер, більше якої треба рахувати слово


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

function CurrentTest(obj) {

	const { textValue, category, questions } = obj;

	this.numberQuestion = 0;
	this.correctAnswers = 0;
	this.isDuring = true;

	this.getCurrentQuestion = () => {
		if (this.numberQuestion + 1 >= questions.length) {
			this.isDuring = false;
		}

		if (this.numberQuestion < questions.length) {
			return questions[this.numberQuestion++];
		} else {
			// return this.isDuring;
		}
	}

	Object.defineProperty(this, 'textValue', {
		get: function () {
			return textValue;
		},
	});

	Object.defineProperty(this, 'category', {
		get: function () {
			return category;
		},
	});

	Object.defineProperty(this, 'questions', {
		get: function () {
			return questions;
		},
	});
}

const stopwatchTest = new StopwatchTest(timeLimit);
const progresStep = 1;


document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
	let currentTest;

	const blockStep1 = document.getElementsByClassName(step1_blockClassName)[0];
	const blockStep2 = document.getElementsByClassName(step2_BlockClassName)[0];
	const blockStep3 = document.getElementsByClassName(step3_BlockClassName)[0];
	const blockStep3Answers = blockStep3.querySelector('.t807__answers');
	blockStep3Answers.innerHTML = '';

	const button = document.querySelector('[href="#start-read"]');
	const stopWatch = document.getElementsByClassName('uc-stopwatch')[0];
	const stopWatchDisplay = stopWatch.querySelector('b');

	button.addEventListener('click', (e) => {
		e.preventDefault();
		if (!stopwatchTest.isRunning) {
			startRead();
		} else {
			stopRead();
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
				console.log('stepNumber= ' + stepNumber);
				break;

			case 2:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'block';
				blockStep3.style.display = 'none';
				stopWatch.style.display = 'block';
				console.log('stepNumber= ' + stepNumber);
				button.textContent = buttonTextStep2;
				break;

			case 3:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'none';
				stopWatch.style.display = 'none';
				blockStep3.style.display = 'block';
				button.style.display = 'none';
				console.log('stepNumber= ' + stepNumber);
				break;

			case 4:
				blockStep1.style.display = 'none';
				blockStep2.style.display = 'none';
				stopWatch.style.display = 'none';
				blockStep3.style.display = 'none';
				button.textContent = buttonTextStep4;
				button.style.display = 'block';
				console.log('stepNumber= ' + stepNumber);
				break;
			default:
				break;
		}
	}

	const startRead = () => {
		const allTest = getAllText();
		currentTest = new CurrentTest(getRandomTest(allTest, ''));
		printTextValue(currentTest.textValue);
		stopwatchTest.timerStart();
		progresSetState(2);
		printTimer();
	}

	const stopRead = () => {
		stopwatchTest.timerStop();
		progresSetState(3);
		printQuestion(currentTest.getCurrentQuestion());
	};

	const showTestResult = (callBack) => {
		progresSetState(4);
		const statisticObj = callBack();
		console.log(statisticObj.wordCount);
		console.log('printHTML');
	}

	const prepareStatistic = () => {
		const obj = {
			time: 0,
			wordCount: {
				const text = currentTest.textValue;
				const words = text.split(' ');
				return words.filter(word => word.length > maxLenghtWord).length;
			}
		}
		const text = currentTest.textValue;
		const words = text.split(' ');
		obj.wordCount = words.filter(word => word.length > maxLenghtWord).length;
		console.log(obj.wordCount);

		return obj;
	};

	const printTimer = () => {
		setInterval(() => {
			if (stopwatchTest.isRunning) {
				const date = new Date(0);
				date.setSeconds(stopwatchTest.timer);
				const timeString = date.toISOString().substring(14, 19);
				stopWatchDisplay.textContent = timeString;
				if (stopwatchTest.timer >= timeLimit) {
					stopRead();
				}
			}
		}, 1000);
	}

	const getRandomTest = (testArray, filter = '') => {
		if (filter != '') {
			const filteredArray = testArray.filter(test => test.category == filter);
			if (filteredArray.length > 0) {
				testArray = filteredArray;
			}
		}
		const rand = Math.floor(Math.random() * testArray.length);
		return testArray[rand];
	}

	const printTextValue = (textValue) => {
		blockStep2.querySelector('.t-text').textContent = textValue;
	}

	const printQuestion = (question) => {
		blockStep3.querySelector('.t-name').textContent = question.question;
		blockStep3Answers.innerHTML = '';
		question.answers.forEach((answer, index) => {
			const voitItemHTML = `
			<div class="t807__answer js-vote-item" data-answer-id="${index}">
			<div class="t-radio__wrapper">
			<label class="t807__answer-text t-radio__control t-descr t-descr_sm t-text_weight_plus">
			<div class="t807__input-wrapper">
			<input type="radio" name="${index}" value="${answer}" data-true-answer="${question.trueAnswer}" class="t807__input t-radio js-vote-btn" onchange="validQuestion(this)">
			<div class="t807__answer-indicator t-radio__indicator"></div>
			</div>
			<span class="t807__answer-text_wrap">${answer}<br></span>
			</label>
			</div>
			
			<div class="t807__answer-progressbar" style=" background-color: #392ad4; opacity: 1;"></div>
			
			<div class="t-vote__btn-res t-descr t-descr_xs" style="display: none;">
			<svg role="presentation" class="t807__answer-icon" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
			<span class="t-vote__btn-res__num js-vote-count">0</span>
			<span>(</span>
			<span class="t-vote__btn-res__percent js-vote-percent">0%</span>
			<span>)</span>
			</div>
			</div>
			`;

			blockStep3Answers.insertAdjacentHTML('beforeend', voitItemHTML);
		});
	}

	(function init() {
		stopWatchDisplay.textContent = '00:00';
		blockStep3.querySelector('a.js-sendvote-btn').parentElement.style.display = 'none';
		progresSetState(1);
	}());

	window.validQuestion = (radio) => {
		if (radio.value == radio.dataset.trueAnswer) {
			currentTest.correctAnswers++;
			radio.closest('.js-vote-item').style.background = 'green';
		} else {
			radio.closest('.js-vote-item').style.background = 'red';
		}
		nextQuestion();
	}

	const nextQuestion = () => {
		if (currentTest.isDuring) {
			setTimeout(() => {
				printQuestion(currentTest.getCurrentQuestion());
			}, 500);
		} else {
			showTestResult(prepareStatistic);
		}
	}

});
