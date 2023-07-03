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
	shuffleCards();
}