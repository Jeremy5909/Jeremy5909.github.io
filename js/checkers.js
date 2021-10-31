/*--------- Game State Data --------------*/

const board = [
    null, 0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6, null,
    7, null, 8, null, 9, null, 10, null, 11, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, null, null, null, 
    12, null, 13, null, 14, null, 15, null, 16, null, 17, null, 18, null, 
    19, null, 20, null, 21, null, 22, null, 23, null
]

// Dom referenes
const cells = $("#checkers td");
let redPieces = $("#checkers p");
let blacksPieces = $("#checkers span");
const redTurnText = $("#checkers .red-turn-text")
const blackTurnText = $("#checkers .black-turn-text")
const divider = $("#checkers #divider")

// Player properties
let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSapce: false
}

// initialize event listeners on pieces
function givePiecesEventListeners(){
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

// holds the length of the players piece count
function getPlayerPieces() {
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
}

function removeCellonclick() {
    for (let i=0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// resets borders to default
function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

let resetSelectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSapce: false
}

// gets ID and index of the bard cells its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
}

function isPieceKing() {
    if ($("#checkers selectedPiece.pieceId").classList.contains("king")) {
        selectedPiece.isKing = true;

    } else {
        selectedPiece.isKing = false
    }

    getAvailableSpaces();
}

