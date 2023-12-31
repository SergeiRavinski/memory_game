import { cards } from './cards.js';

export default function Game() {
	const maximumAttempts = 10;
	const fieldAttempts = document.querySelector('.main__attempts');
	const board = document.querySelector('.main__cards');
	const announcement = document.querySelector('.main__announcement');
	const resetButton = document.querySelector('.main__reset');
	const duplicatedCards = [...cards, ...cards];

	let attempts = 0;
	let cardsChosen = [];
	let cardsChosenIds = [];
	let cardsFliped = [];
	let lockedBoard = false;
	
	resetButton.addEventListener('click', handleResetButtonClick);

	function shuffleCards() {
		duplicatedCards.sort(() => 0.5 - Math.random());
	}

	/**
	 * @param {*} currentCard - get current button
	 */
	function flipCard(currentCard) {
		currentCard.classList.add('main__cards-card--flipped');
		currentCard.removeEventListener('click', handleCardClick);
		lockedBoard = false;
	}

	function flipMismachedCards() {
		for (const cardChosen of cardsChosen) {
			cardChosen.classList.remove('main__cards-card--flipped');
			setTimeout(() => {
				cardChosen.addEventListener('click', handleCardClick);
			}, 800)	
		}

		emptyArrays();
	}

	function emptyArrays() {
		cardsChosenIds = [];
		cardsChosen = [];
	}

	function announceVictory() {
		const flattenedArrayOfFlipedCards = cardsFliped.flat();

		if (flattenedArrayOfFlipedCards.length === duplicatedCards.length) {
			announcement.classList.add('main__announcement--visible');
			announcement.textContent = 'You won!';
			resetButton.textContent = 'Start new game';
		}	
	}

	function announceDefeat() {
		announcement.classList.add('main__announcement--visible');
		announcement.textContent = 'You lose! Try again!';
		resetButton.textContent = 'Start new game';
	}

	function handleCardClick(event) {
		const currentCard = event.currentTarget;
		const currentCardId = currentCard.childNodes[1].id;
		
		if (cardsChosen.length < 2 && cardsChosenIds.length < 2 && lockedBoard === false) {
			lockedBoard = true;
			cardsChosen.push(currentCard);
			cardsChosenIds.push(currentCardId);
			flipCard(currentCard);
		}
		
		if (cardsChosen.length === 2 && lockedBoard === false) {
			lockedBoard = true;
			checkMatch(cardsChosenIds);
			countAttempts(event);
		}
	}
	
	/**
	 * Check if the cards are match
	 */
	function checkMatch() {
		const firstCard = cardsChosenIds[0];
		const secondCard = cardsChosenIds[1];

		if (firstCard === secondCard) {
			cardsFliped.push(cardsChosenIds);
			emptyArrays();
			lockedBoard = false;
		} else {
			setTimeout(() => {
				flipMismachedCards();
				lockedBoard = false;
			}, 1000);
		}	
	}
	
	/**
	 * Count the attempts
	 */
	function countAttempts() {
		const flattenedArrayOfFlipedCards = cardsFliped.flat();

		if (attempts <= maximumAttempts - 1) {
			attempts += 1;
		} if (attempts <= maximumAttempts) {	
			announceVictory();
		} if (attempts === maximumAttempts && flattenedArrayOfFlipedCards.length !== duplicatedCards.length) {
			announceDefeat();
		} 

		fieldAttempts.textContent = `Attempts: ${attempts} / ${maximumAttempts}`;
	}

	/**
	 * Reset or start new game
	 */
	function handleResetButtonClick() {
		attempts = 0;
		cardsFliped = [];
		shuffleCards();
		renderHTML();
	}

	/**
	 * Create the board
	 */
	function renderHTML() {
		announcement.classList.remove('main__announcement--visible');
		board.innerHTML = '';
		fieldAttempts.textContent = `Attempts: ${attempts} / ${maximumAttempts}`;
		resetButton.textContent = 'Reset game';

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