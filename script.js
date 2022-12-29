const Screen = (() => {

  let gameZone = document.getElementById('game');

  const clearZone = () => gameZone.innerHTML = ''

  const endGameHTML = `
  <div id="end-page" class="d-flex flex-column align-items-center">
    <p id="result" class="fs-1">Player 2 won!</p>
    <p class="fs-2">Score:</p>
    <div class="d-flex">
      <p id="player-one-name" class="fs-4 me-4">Player 1:</p>
      <p id="player-one-score" class="fs-4"> 1 </p>
    </div>
    <div class="d-flex">
      <p id="player-two-name" class="fs-4 me-4">Player 2:</p>
      <p id="player-two-score" class="fs-4"> 0 </p>
    </div>
    <div>
      <p id="play-again-btn" class="btn btn-dark"> Play Again </p >
      <p id="new-game-btn" class="btn btn-dark"> Change Users </p >
    </div>
  </div>`

  function markcell(squareId, playerColor){
    let currentSquare = document.getElementById(squareId)
    currentSquare.style.backgroundColor = playerColor
    currentSquare.removeEventListener('click', TicTacToe.turn, false)
  }

  let askPlayerInfo = () => {
    clearZone()
    let playerInfoZone 
    playerInfoZone = document.createElement('div')
    playerInfoZone.innerHTML = 
    '<form> <labe class="form-label"> Whats the name of the first player? </label> <input id="player-name" type="text" class="form-control"> <br> <label class="form-label"> Whats the color of the first player? </label> <input id="player-color" type="color" class="form-control"> <br> <p id="get-info-btn" class="btn btn-primary"> Submit </p > </form>'
    gameZone.appendChild(playerInfoZone)
    const getInfoBtn = document.getElementById('get-info-btn')
    getInfoBtn.addEventListener('click', TicTacToe.getPlayers)
  }

  const endGamePage = (result, player1, player2) => {
    clearZone()
    gameZone.innerHTML = endGameHTML
    let player1NameZone = document.getElementById("player-one-name")
    let resultZone = document.getElementById("result")
    let player1ScoreZone = document.getElementById("player-one-score")
    let player2NameZone = document.getElementById("player-two-name")
    let player2ScoreZone = document.getElementById("player-two-score")
    let playAgainBtn = document.getElementById("play-again-btn")
    let newGameBtn = document.getElementById("new-game-btn")

    resultZone.innerText= result
    player1NameZone.innerText = player1.name
    player1ScoreZone.innerText = player1.getScore()
    player2NameZone.innerText = player2.name
    player2ScoreZone.innerText = player2.getScore();
    playAgainBtn.addEventListener('click', TicTacToe.startGame, false)
    newGameBtn.addEventListener('click', TicTacToe.resetGAme)
  }

  const displayMessage = (message) => {
    let alertZone = document.getElementById("alert")
    let notice = document.getElementById("notice")
    let btnClose = document.querySelector(".btn-close")
    btnClose.addEventListener('click', () => alertZone.classList.add("d-none"))
    alertZone.classList.remove("d-none")
    notice.innerHTML = message
  }

  let createGrid = () => {
    clearZone()
    let newBox
    for (let i=0; i < 9 ; i++){
      newBox = document.createElement('div');
      newBox.classList.add('boxes');
      newBox.setAttribute('id', `${i}`)
      newBox.classList.add(`box-${i}`);
      newBox.style.borderWidth = "0.5px";
      newBox.style.borderStyle = "solid";
      newBox.addEventListener('click',TicTacToe.turn, false);
      gameZone.appendChild(newBox)
    }
 }

 return {createGrid, askPlayerInfo, clearZone, markcell, displayMessage, endGamePage}
})()


const Player = (name, color) => {
  let score = 0

  const incrementScore = () =>  score++ 

  const getScore = () => score

  return { name , color, incrementScore, getScore}
}

const TicTacToe = (() => {
  let player1, player2, currentplayer, board

  const WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

  let savePlayerInfo = () => {
    let playerName = document.getElementById('player-name').value;
    let playerColor = document.getElementById('player-color').value;
    Screen.clearZone()
    return {playerName, playerColor}
  }

  const getPlayers = () => {
    if (!player1) {
      let playerInfo = savePlayerInfo()
      if (playerInfo.playerName != "") {
        player1 = Player(playerInfo.playerName, playerInfo.playerColor)
      } else Screen.displayMessage("Player's name must not be empy")
      Screen.askPlayerInfo()
    } else if (!player2) {
      let playerInfo = savePlayerInfo()
      if (playerInfo.playerName != "" && playerInfo.playerName != player1.name && playerInfo.playerColor != player1.color ) {
        player2 = Player(playerInfo.playerName, playerInfo.playerColor)
        startGame()
      } else {
        Screen.askPlayerInfo()
        Screen.displayMessage("Player's name must not be empy and must be different from player 1")
      }
    } 
  }

  let rotateCurrentPlayer = () => {
    currentplayer = currentplayer == player1 ? player2 : player1
  }

  const checkTie = () => {
    let emptyBoxes = board.some(e => typeof e == 'number')
    return !emptyBoxes
  }

  const checkWin = () => {
    let winner = WIN_COMBINATIONS.some(combination => board[combination[0]] == board[combination[1]] && board[combination[1]] == board[combination[2]])
    return winner
  }

  const endGame =(message) => {
    Screen.endGamePage(message, player1, player2)
  }

  const turn = (square) => {
    Screen.markcell(square.target.id,currentplayer.color)
    board[square.target.id] = currentplayer.name
    if (checkWin()) {
      currentplayer.incrementScore()
      endGame(`${currentplayer.name} Won!`)
    } else if (checkTie()) endGame("It is a Tie")
    else rotateCurrentPlayer()
  }

  const startGame = () => {
    board = Array.from(Array(9).keys())
    currentplayer = player1
    Screen.createGrid()
  }

  const resetGAme = () => {
    player1 = ''
    player2 = ''
    Screen.askPlayerInfo()
  }

  const init = () => {
    Screen.askPlayerInfo()
  }

  return {
    init, getPlayers, turn, startGame, resetGAme
  }
})()

TicTacToe.init()

