// ******************************************************
//  Значення у цій секції можна редагувати в залежності 
//  від корситувацьких потреб.
//  Текст у лапках є дописом до відповідних елементів.
//  Текст можна змінювати. (!!! Лапки НЕ ВИДАЛЯТИ !!!!!)
//  Відступи не мають значення
// ******************************************************


const buttonTextStep1 = '	Почати тест	';  // Текст для кнонки початку тесту
const buttonTextStep2 = '	Прочитав	';  // Текст для кнопки коли користувач завершив читання
const buttonTextStep4 = '	Хочеш покращити результат?	';  // Текст для кнопки коли користувач хоче повторити тест
const timeLimit = 300;   					// Максимальний час для проходження тесту(сек);
const minLetterWord = 1;					// Мінімальна кількість літер у слові для підрахунку. 


// ******************************************************
//  Далі змінювати не можна
// ******************************************************

const step1_categoryList = 'categoryListContainer';	// Ім'я ідентифікатора для блоку з кнопками категоріями.
const step1_blockClassName = 'uc-blockStep-1';	// Ім'я класу для блоку першого кроку.
const step1_startTest_btn = 'uc-start-read';	// Ім'я класу для блоку першого кроку.
const step2_BlockClassName = 'uc-blockStep-2';	// Ім'я класу для блоку другого кроку.
const step2_BlockTextTitle = '[field="title"]';	// селектор для блоку з заголовком текстом.
const step2_BlockTextValue = '[field="text"]';	// селектор для блоку з текстом тесту.
const step3_BlockClassName = 'uc-blockStep-3';	// Ім'я класу для блоку третього кроку.
const step4_BlockClassName = 'uc-blockStep-4';	// Ім'я класу для блоку четвертого кроку.


class StopwatchTest {
	constructor() {
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
		};

		this.timerStop = () => {
			this.isRunning = false;
			clearInterval(intervalID);
		};

		this.timerStart = () => {
			this.timer = 0;
			this.isRunning = true;
			intervalID = setInterval(() => {
				this.timerCount();
			}, 1000);
		};
	}
}

class CurrentTest {
	constructor(obj) {

		Object.assign(this, obj);
		this.textValue = this.textValue.replace(/[\s]+/g, ' ').trim();

		this.numberQuestion = 0;
		this.correctAnswers = 0;
		this.isDuring = true;

		this.getCurrentQuestion = () => {
			if (this.numberQuestion + 1 >= this.questions.length) {
				this.isDuring = false;
			}

			if (this.numberQuestion < this.questions.length) {
				return this.questions[this.numberQuestion++];
			} else {
			}
		};
	}
}

const stopwatchTest = new StopwatchTest(timeLimit);

const getAllTest = () => {
	const http = false;
	if (http) {
		return parseHTML(htmlString);
	} else {
		return allTests;
	}
}

let currentTest;

const blockStep1 = document.getElementsByClassName(step1_blockClassName)[0];
const blockCategoryList = document.getElementById(step1_categoryList);

const blockStep2 = document.getElementsByClassName(step2_BlockClassName)[0];

const blockStep3 = document.getElementsByClassName(step3_BlockClassName)[0];
const blockStep3Answers = blockStep3.querySelector('.js-vote-item').parentNode;
blockStep3Answers.innerHTML = '';

const blockStep4 = document.getElementsByClassName(step4_BlockClassName)[0];
const blockStep4ResultBlock = blockStep4.querySelector('.t-text');

const startTestButton = document.getElementsByClassName(step1_startTest_btn)[0].querySelector('a');
const stopWatch = document.getElementsByClassName('uc-stopwatch')[0];
const stopWatchDisplay = stopWatch.querySelector('b');

const clickHandler = (e) => {
	e.preventDefault();
	if (!stopwatchTest.isRunning) {
		startRead();
	} else {
		stopRead();
		startTestButton.removeEventListener('click', clickHandler);
	}
};

startTestButton.addEventListener('click', clickHandler);

const progresSetState = (stepNumber) => {
	switch (stepNumber) {
		case 1:
			blockStep1.style.display = 'block';
			blockCategoryList.style.display = 'flex';
			blockStep2.style.display = 'none';
			blockStep3.style.display = 'none';
			blockStep4.style.display = 'none';
			stopWatch.style.display = 'none';
			startTestButton.textContent = buttonTextStep1;
			break;

		case 2:
			blockStep1.style.display = 'none';
			blockCategoryList.style.display = 'none';
			blockStep2.style.display = 'block';
			blockStep3.style.display = 'none';
			blockStep4.style.display = 'none';
			stopWatch.style.display = 'block';
			startTestButton.textContent = buttonTextStep2;
			break;

		case 3:
			blockStep1.style.display = 'none';
			blockCategoryList.style.display = 'none';
			blockStep2.style.display = 'none';
			stopWatch.style.display = 'none';
			blockStep3.style.display = 'block';
			blockStep4.style.display = 'none';
			startTestButton.style.display = 'none';
			break;

		case 4:
			blockStep1.style.display = 'none';
			blockCategoryList.style.display = 'none';
			blockStep2.style.display = 'none';
			stopWatch.style.display = 'none';
			blockStep3.style.display = 'none';
			blockStep4.style.display = 'block';
			startTestButton.textContent = buttonTextStep4;
			startTestButton.style.display = 'table-cell';

			break;
		default:
			break;
	}
}

const startRead = (category = '') => {
	const allTest = getAllTest();
	currentTest = new CurrentTest(getRandomTest(allTest, category));
	printTextValue();
	stopwatchTest.timerStart();
	progresSetState(2);
	printTimer();
}

const stopRead = () => {
	stopwatchTest.timerStop();
	progresSetState(3);
	printQuestion(currentTest.getCurrentQuestion());
};

const prepareStatistic = () => {
	const obj = {
		time: stopwatchTest.timer,
		wordCount: 0
	}
	const str = currentTest.textValue;
	const words = str.split(' ');
	obj.wordCount = words.filter(word => word.length >= minLetterWord).length;
	return obj;
};

const showTestResult = () => {
	progresSetState(4);
	const statisticObj = prepareStatistic();
	const prepireTimeStr = (time) => {
		const date = new Date(0);
		date.setSeconds(time);
		const mm = date.toISOString().substring(15, 16);
		const ss = date.toISOString().substring(17, 19) + 'сек';
		const timeStr = (mm == '00') ? ss : mm + 'хв ' + ss;
		return timeStr;
	}

	const wordPS = Math.floor(statisticObj.wordCount * 60 / statisticObj.time);
	const understainText = Math.floor(currentTest.correctAnswers * 100 / currentTest.questions.length);

	const strHTML = `
		<p>Слів у тексті: <b style="font-size: 1.2em;">${statisticObj.wordCount}</b></p>
		<p>Час читання: <b style="font-size: 1.2em;">${prepireTimeStr(statisticObj.time)}</b></p>
		<p>Швидкість читання: <b style="font-size: 1.2em;"> ${wordPS} </b> слів в хвилину</p>
		<p>Розуміння тексту: <b style="font-size: 1.2em;">${understainText}%</b></p>
		`;

	blockStep4ResultBlock.innerHTML = strHTML;
}

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

const printTextValue = () => {
	blockStep2.querySelector(step2_BlockTextTitle).textContent = currentTest.textTitle;
	const step2_BlockText = blockStep2.querySelector(step2_BlockTextValue);
	step2_BlockText.textContent = currentTest.textValue;
	step2_BlockText.style.fontSize = `${currentTest.textFontSize}px`;
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
			<input type="radio" name="${index}" value="${index + 1}" data-true-answer="${question.trueAnswer}" class="t807__input t-radio js-vote-btn" onchange="validQuestion(this)">
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

validQuestion = (radio) => {
	if (radio.value == radio.dataset.trueAnswer) {
		currentTest.correctAnswers++;
		radio.closest('.js-vote-item').style.background = '#E6F4E7';
		radio.closest('.js-vote-item').style.border = '2px solid #4AA181';
		radio.closest('.js-vote-item').style.borderRadius = '5px';
	} else {
		radio.closest('.js-vote-item').style.background = '#F4E6E7';
		radio.closest('.js-vote-item').style.border = '2px solid #EFC2C1';
		radio.closest('.js-vote-item').style.borderRadius = '5px';
	}
	nextQuestion();
}

const nextQuestion = () => {
	if (currentTest.isDuring) {
		setTimeout(() => {
			printQuestion(currentTest.getCurrentQuestion());
		}, 500);
	} else {
		showTestResult();
	}
}