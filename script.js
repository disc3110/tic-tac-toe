const Screen = (() => {

  let gameZone = document.getElementById('game');

  const clearZone = () => gameZone.innerHTML = ''

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

  const displayMessage = (message) => {
    clearZone()
    let messageContainer = document.createElement('div')
    messageContainer.innerText = message
    gameZone.appendChild(messageContainer)
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

 return {createGrid, askPlayerInfo, clearZone, markcell, displayMessage}
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
      } 
      Screen.askPlayerInfo()
    } else if (!player2) {
      let playerInfo = savePlayerInfo()
      if (playerInfo.playerName != "" && playerInfo.playerName != player1.name && playerInfo.playerColor != player1.color ) {
        player2 = Player(playerInfo.playerName, playerInfo.playerColor)
        startGame()
      } else Screen.askPlayerInfo()
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
    Screen.displayMessage(message)
  }

  const turn = (square) => {
    Screen.markcell(square.target.id,currentplayer.color)
    board[square.target.id] = currentplayer.name
    if (checkWin()) endGame(`${currentplayer.name} Won!`)
    else if (checkTie()) endGame("It is a Tie")
    else rotateCurrentPlayer()
  }

  const startGame = () => {
    board = Array.from(Array(9).keys())
    currentplayer = player1
    Screen.createGrid()
  }

  const init = () => {
    Screen.askPlayerInfo()
  }

  return {
    init, getPlayers, turn
  }
})()

TicTacToe.init()

