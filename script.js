let gameZone = document.getElementById('game');

const Board = () => {

  function markcell(){
    this.style.backgroundColor='black';
  }

 let createGrid = () => {
  for (let i=1; i <= 9 ; i++){
    newBox = document.createElement('div');
    newBox.classList.add('boxes');
    newBox.classList.add(`box-${i}`);
    newBox.style.borderWidth = "0.5px";
    newBox.style.borderStyle = "solid";
    newBox.addEventListener('click',markcell);
    gameZone.appendChild(newBox)
  }
 }

 return {createGrid}
}

const TicTacToe = (player1, player2) => {
  WIN_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
  let currentplayer = player1

  let rotateCurrentPlayer = () => {
    currentplayer = currentplayer == player1 ? player2 : player1
  }
}

const newGame = Board();
newGame.createGrid()