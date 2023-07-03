import { cards } from './cards.js';

export default function Game() {
	let attempts = 0;
	let cardsChosen = [];
	let cardsChosenIds = [];
	let cardsFliped = [];
	let lockedBoard = false;
	
	const maximumAttempts = 25;
	const fieldAttempts = document.querySelector('.main__attempts');
	const board = document.querySelector('.main__cards');
	const announcement = document.querySelector('.main__announcement');
	const resetButton = document.querySelector('.main__reset');
	const duplicatedCards = [...cards, ...cards];
	
	resetButton.addEventListener('click', handleResetButtonClick);

	function shuffleCards() {
		duplicatedCards.sort(() => 0.5 - Math.random());
	}

	function flipCard(currentCard) {
		currentCard.classList.add('main__cards-card--flipped');
	}

	function flipMismachedCards() {
		for (const cardChosen of cardsChosen) {
			cardChosen.classList.remove('main__cards-card--flipped');
		}

		emptyArrays();
	}

	function emptyArrays() {
		cardsChosenIds = [];
		cardsChosen = [];
	}

	function announceVictory() {
		announcement.classList.add('main__announcement--visible');
		announcement.textContent = 'You won!';
	}

	function announceDefeat() {
		announcement.classList.add('main__announcement--visible');
		announcement.textContent = 'You lose!';
	}




	function handleResetButtonClick() {
		attempts = 0;
		cardsFliped = [];
		shuffleCards();
		renderHTML();
	}

	function renderHTML() {
		announcement.classList.remove('main__announcement--visible');
		board.innerHTML = '';
		fieldAttempts.textContent = `Attempts: ${attempts} / ${maximumAttempts}`;

		for (const card of duplicatedCards) {
			const button = document.createElement('button');
			const frontFace = document.createElement('div');
			const backFace = document.createElement('img');

			button.addEventListener('click', handleCardClick);

			button.className = 'main__cards-card';
			frontFace.className = 'main__front-face';
			backFace.className = 'main__back-face';

			backFace.alt = 'Image of a boat';
			backFace.id = `${card.name}`;
			backFace.src = `${card.image}`;

			button.append(
				frontFace,
				backFace
			);
			board.appendChild(button);
		}	
	}

	shuffleCards();
	renderHTML();
}