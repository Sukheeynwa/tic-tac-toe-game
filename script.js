function player(name, marker, score) {
	return {
		name,
		marker,
		score,
	}
};

const gameModule = (function(){
	let mainBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	let player1 = player("Player One", "x", 0);
	let player2 = player("Player Two", "o", 0);
	let turn = true;
	let currentPlayer = player1;
	const gameBoard = document.querySelector("#game-board");
	const gameCells = document.querySelectorAll("#game-cell");
	const turnModule = document.querySelector("#turn-module");
	const player1Score = document.querySelector("#player1-score");
	const player2Score = document.querySelector("#player2-score");

	const startGame = function() {
		gameBoard.addEventListener("click", startRound);
	};

	const startRound = function(e) {
		checkAvail(e);
	};
	
	const checkAvail = function(e) {
		if (e.target.textContent === "") {
			setMarker(e);
			checkWinner(currentPlayer);
			checkFull();
			togglePlayer();
		} else {
			console.log("ERROR")
		};
	};

	const setMarker = function (e) {
		e.target.textContent = currentPlayer.marker;
		e.target.setAttribute("id", `${currentPlayer.marker}-button`)
		let i = Array.from(gameCells).indexOf(e.target);

		if (e.target === gameCells[i]) {
			mainBoard[i] = currentPlayer.marker;
		};

	}

	const togglePlayer = function () {
    turn = !turn;
		if (turn === true) {
			currentPlayer = player1;
			turnModule.textContent = "TURN " + currentPlayer.marker;
		} else if (turn === false) {
			currentPlayer = player2;
			turnModule.textContent = "TURN " + currentPlayer.marker;
		};
	};

	const checkWinner = function(player) {
		if (mainBoard[0] === player.marker && mainBoard[1] === player.marker && mainBoard[2] === player.marker || 
				mainBoard[3] === player.marker && mainBoard[4] === player.marker && mainBoard[5] === player.marker ||
				mainBoard[6] === player.marker && mainBoard[7] === player.marker && mainBoard[8] === player.marker ||
				mainBoard[0] === player.marker && mainBoard[3] === player.marker && mainBoard[6] === player.marker ||
				mainBoard[1] === player.marker && mainBoard[4] === player.marker && mainBoard[7] === player.marker ||
				mainBoard[2] === player.marker && mainBoard[5] === player.marker && mainBoard[8] === player.marker ||
				mainBoard[0] === player.marker && mainBoard[4] === player.marker && mainBoard[8] === player.marker ||
				mainBoard[2] === player.marker && mainBoard[4] === player.marker && mainBoard[6] === player.marker) 
			{
				player.score ++;
				player1Score.textContent = gameModule.player1.score;
				player2Score.textContent = gameModule.player2.score;
				if (player.score === 3) {
					resultModule.resultDialog.showModal();
				}
				resetRound();
			};
	};

	const checkFull = function() {
		if (mainBoard.every((item) => item === "x" || item === "o") === true) {
			resetRound();
		};
	};

	const resetRound = function() {
		currentPlayer = player1;
		mainBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		gameCells.forEach(item => {
			item.textContent = "";
		});
	};

	return {
		startGame, player1, player2, currentPlayer, turnModule, player1Score, player2Score
	};
})();


const startModule = (function() {
	const buttonX = document.querySelector("#buttonX");
	const buttonO = document.querySelector("#buttonO");
	const buttonStart = document.querySelector("#button-start");
	const startDialog = document.querySelector("#start-dialog");

	buttonX.addEventListener("click", () => {
		gameModule.player1.marker = "x";
		gameModule.player2.marker = "o";
		gameModule.player1Score.style.color = "teal";
		gameModule.player2Score.style.color = "coral";
		gameModule.turnModule.textContent = "TURN " + gameModule.currentPlayer.marker;
		buttonX.style.backgroundColor = "teal";
		buttonO.style.backgroundColor = "#143333";
	});
	
	buttonO.addEventListener("click", () => {
		gameModule.player1.marker = "o";
		gameModule.player2.marker = "x";
		gameModule.player2Score.style.color = "teal";
		gameModule.player1Score.style.color = "coral";
		gameModule.turnModule.textContent = "TURN " + gameModule.currentPlayer.marker;
		buttonO.style.backgroundColor = "coral";
		buttonX.style.backgroundColor = "#143333";
	});

	buttonStart.addEventListener("click", () => {
		gameModule.startGame();
		startDialog.close();
	})

	return {
	};
})();

const resultModule = (function() {
	const resultDialog = document.querySelector("#result-dialog");
	const resultMessage = document.querySelector("#result-message");
	resultMessage.textContent = `${gameModule.currentPlayer.name} WON THE GAME!`;
	const resetBtn = document.querySelector("#reset-button");

	resultDialog.addEventListener('cancel', (event) => {
    event.preventDefault();
	});

	resetBtn.addEventListener("click", () => {
		location.reload();
	})

	return {
		resultDialog,
	}
})();


