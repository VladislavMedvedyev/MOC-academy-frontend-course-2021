// A simple game that is the main character is a circle and the player needs to press the keys on the screen so that the circle increases and gains points.

const letterShowEl = document.querySelector('[data-key]') as HTMLSpanElement;
const scoreEl = document.querySelector('[data-score]') as HTMLSpanElement;
const scoreChangesEl = document.querySelector('[data-score-changes]') as HTMLSpanElement;
const circleEl = document.querySelector('[data-circle]') as HTMLDivElement;
const startButtonEl = document.querySelector('[data-button-start]') as HTMLButtonElement;
const stopButtonEl = document.querySelector('[data-button-stop]') as HTMLButtonElement;
const restartButtonEl = document.querySelector('[data-button-restart]') as HTMLButtonElement;

let counter: number = 100;
let isKeyPressed: boolean = false;

function letterShow(): void {
	const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	const letter: string = alphabet[Math.floor(Math.random() * alphabet.length)]
	letterShowEl.innerHTML = letter;
	scoreEl.textContent = counter.toString();
}

letterShow();

function progressBar(): void {
	const progressBarEl = document.querySelector('[data-progress-bar]') as HTMLDivElement;
	let toggle: boolean = false;
	let width: number = 99;
	if (toggle === false) {
		toggle = true;
		const progressBarInterval = setInterval(frame, 20);
		function frame(): void {
			if (width >= 100) {
				clearInterval(progressBarInterval);
				toggle = false;
			} else {
				width -= 1;
				progressBarEl.style.width = width.toString() + '%';
			}
		}
	}
}

function bubbleResize(num: number): void {
	circleEl.style.width = num * 1.5 + 'px';
	circleEl.style.height = num * 1.5 + 'px';
}

function getScores(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function endGame(): void {
	if (counter <= 0) {
		scoreEl.textContent = 'You loose';
		clearInterval(interval);
	} else if (counter >= 200) {
		scoreEl.textContent = 'You win';
		clearInterval(interval);
	}
}

function letterChanger(): void {
	letterShow();
	progressBar();
	isKeyPressed = false;
	document.addEventListener('keyup', gameplay);
	if (isKeyPressed === false) {
		const scoreDeducted: number = getScores(10, 15)
		counter -= scoreDeducted;
		scoreChangesEl.textContent = `- ${scoreDeducted}`;
	}
	scoreEl.textContent = counter.toString();
	endGame();
	bubbleResize(counter);
}

let interval = setInterval(letterChanger, 2000);

function gameplay(event: KeyboardEvent): void {
	const keyToPress: string = letterShowEl.textContent;
	const keyPressed: string = event.key.toUpperCase();
	if (keyPressed === keyToPress) {
		const scoreGiven: number = getScores(5, 10);
		counter += scoreGiven;
		scoreChangesEl.textContent = `+ ${scoreGiven}`;
		letterShow();
		progressBar();
	} else {
		const scoreDeducted: number = getScores(20, 25)
		counter -= scoreDeducted;
		scoreChangesEl.textContent = `- ${scoreDeducted}`;
		letterShow();
		progressBar();
	}
	scoreEl.textContent = counter.toString();
	isKeyPressed = true;
	clearInterval(interval);
	interval = setInterval(letterChanger, 2000);
	bubbleResize(counter);
	endGame();
}

document.addEventListener('keyup', gameplay);

function stopGame(): void {
	clearInterval(interval);
}
stopGame();
function startGame(): void {
	interval = setInterval(letterChanger, 2000);
}

function restartGame():void {
	scoreChangesEl.textContent = '0';
	counter = 100;
	bubbleResize(134);
	letterShow();
	clearInterval(interval);
}

startButtonEl.addEventListener("click", startGame);
stopButtonEl.addEventListener('click', stopGame);
restartButtonEl.addEventListener('click', restartGame);
