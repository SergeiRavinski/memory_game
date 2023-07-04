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

	function flipCard(currentCard) {
		currentCard.classList.add('main__cards-card--flipped');
		currentCard.removeEventListener('click', handleCardClick);
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
		announcement.classList.add('main__announcement--visible');
		announcement.textContent = 'You won!';
	}

	function announceDefeat() {
		announcement.classList.add('main__announcement--visible');
		announcement.textContent = 'You lose!';
	}





	function handleCardClick(event) {
		const currentCard = event.currentTarget;
		const cardId = currentCard.childNodes[1].id;
		
		if (cardsChosen.length < 2 && cardsChosenIds.length < 2 && lockedBoard === false) {
			lockedBoard = true;
			cardsChosen.push(currentCard);
			cardsChosenIds.push(cardId);
			flipCard(currentCard);
			lockedBoard = false;
		}
		
		if (cardsChosen.length === 2) {
			checkMatch(cardsChosenIds);
		}

		countAttempts();
	}
	
	function checkMatch(cardsChosenIds) {
		if (cardsChosenIds[0] === cardsChosenIds[1]) {
			cardsFliped.push(cardsChosenIds);
			//const flattenedArrayOfFlipedCards = cardsFliped.flat();
			
			//removeEventListeners(flattenedArrayOfFlipedCards);
			//announceVictory(flattenedArrayOfFlipedCards);
			emptyArrays();
		} else {
			setTimeout(() => {
				flipMismachedCards();
			}, 1000);
		}	
	}
	
	function countAttempts() {
		const flattenedArrayOfFlipedCards = cardsFliped.flat();

		if (attempts < maximumAttempts - 1) {
			attempts += 1;
		} 
		//Fix bugs with the victory announcement
		else if (flattenedArrayOfFlipedCards.length === duplicatedCards.length) {
			announceVictory(flattenedArrayOfFlipedCards);
			console.log('Won')
		} else {
			attempts += 1;
			announceDefeat();
		}	
		fieldAttempts.textContent = `Attempts: ${attempts} / ${maximumAttempts}`;
		console.log(flattenedArrayOfFlipedCards.length, duplicatedCards.length)
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