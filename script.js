/*
    tic tac toe game
    
    UI:
    -> create 9 divs and make them clickable
    -> once clicked, put a 'X' image or 'O' image respectively
    -> only empty divs should be clickable, display error message on clicking on an already marked div

    Logic:
    -> 2 player game
    -> make a gameboard object, 2 player objects, and a game object (to control the flow of the game)

    -> gameboard object will store the board as a 2D array (3x3), and other details such as whose turn it is, who is the winner,

    -> player object will have the player name, their selected option (X or O)

    -> game object is the most important one, it will have:
        -> function initializeGame to set up board and prompt the players to enter their names and pick their choice (X or O)
        -> function playTurn to play a turn and mark acc to whose turn it is and then update the board
            -> function checkChoice to check if the player choice is correct or wrong
            -> function handleWrongChoice if the player marks on a already marked spot
        -> function checkWinner to check if a player has won or not
        -> function displayWinner to display the winner
        -> function resetBoard to reset the board

    -> make the gameboard and the game object as IIFE (module pattern) as we need only one instance of it
    -> make the player object as a factory function since we need two instances of it
*/

const board = (function () {

    const playerInput = function () {
        const enterButtons = document.querySelectorAll('[type="submit"]');
        const turn = document.querySelector('.t');

        function changePlayerName(player, name) {
            let newName = name;

            if (player.classList[0].includes('1')) {
                player1.name = name;
                newName += ' (X)'

                if (player1.turn) {
                    turn.textContent = `${player1.name}'s`;
                }
            }

            else {
                player2.name = name;
                newName += ' (O)'

                if (player2.turn) {
                    turn.textContent = `${player2.name}'s`;
                }
            }

            player.textContent = newName;
        }

        enterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const name = document.querySelector(`input.${button.classList[0]}`);
                const player = document.querySelector(`h2.${button.classList[0]}`);
                const playerDiv = document.querySelector(`div.${button.classList[0]}`);

                if (name.value.length > 0) {
                    changePlayerName(player, name.value);
                    playerDiv.style.visibility = 'hidden';
                    name.value = '';
                }
            })
        });
    };

    return { playerInput };
})();

const player = function (name, turn) {
    return { name, turn };
};

const game = (function () {

    function handleClick(e) {
        const cell = e.target;

        if (cell.childNodes.length === 0 && e.target.tagName.toLowerCase() === 'div') {
            const t = document.querySelector('.t');
            const img = document.createElement('img');
            img.setAttribute('height', '100%');
            img.setAttribute('width', '100%');

            if (player1.turn) {
                img.setAttribute('src', 'x.svg');
                img.setAttribute('alt', 'X');
                cell.style.backgroundColor = 'lightskyblue';
                t.textContent = `${player2.name}'s turn`;
            }

            else {
                img.setAttribute('src', 'o.svg');
                img.setAttribute('alt', 'O');
                cell.style.backgroundColor = 'lightgreen';
                t.textContent = `${player1.name}'s turn`;
            }

            cell.appendChild(img);

            player1.turn ^= true;
            player2.turn ^= true;
        }
    }

    const setUpBoard = function () {

        const header = document.querySelector('h2.turn');
        const sp = document.createElement('span');
        sp.classList.add('t');

        header.textContent = `It is `;
        sp.textContent = `${player1.name}'s turn`;

        header.appendChild(sp);

        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', playTurn);
        })
    }

    const checkBoard = function () {
        const cells = document.querySelectorAll('.cell');
        let arr = [];
        let result = 3; // 0 if p1 wins, 1 if p2 wins, 2 if draw, 3 continue

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].childNodes.length > 0) {
                if (cells[i].childNodes[0].src.includes('x')) {
                    arr.push(`${i}x`);
                }

                else {
                    arr.push(`${i}o`);
                }
            }
        }

        // check horizontal

        for (let i = 0; i < 9; i += 3) {
            let s1 = `${i}x`;
            let s2 = `${i + 1}x`;
            let s3 = `${i + 2}x`;

            let s4 = `${i}o`;
            let s5 = `${i + 1}o`;
            let s6 = `${i + 2}o`;

            if (arr.includes(s1) && arr.includes(s2) && arr.includes(s3)) {
                result = 0;
                break;
            }

            else if (arr.includes(s4) && arr.includes(s5) && arr.includes(s6)) {
                result = 1;
                break;
            }
        }

        // check vertical

        for (let i = 0; i < 3; i++) {
            let s1 = `${i}x`;
            let s2 = `${i + 3}x`;
            let s3 = `${i + 6}x`;

            let s4 = `${i}o`;
            let s5 = `${i + 3}o`;
            let s6 = `${i + 6}o`;

            if (arr.includes(s1) && arr.includes(s2) && arr.includes(s3)) {
                result = 0;
                break;
            }

            else if (arr.includes(s4) && arr.includes(s5) && arr.includes(s6)) {
                result = 1;
                break;
            }
        }

        // check diagonal

        let d = [[0, 4, 8], [2, 4, 6]];

        for (let i = 0; i < 2; i++) {
            let s1 = `${d[i][0]}x`;
            let s2 = `${d[i][1]}x`;
            let s3 = `${d[i][2]}x`;

            let s4 = `${d[i][0]}o`;
            let s5 = `${d[i][1]}o`;
            let s6 = `${d[i][2]}o`;

            if (arr.includes(s1) && arr.includes(s2) && arr.includes(s3)) {
                result = 0;
                break;
            }

            else if (arr.includes(s4) && arr.includes(s5) && arr.includes(s6)) {
                result = 1;
                break;
            }
        }

        if (result == 3) {
            // check draw

            if (arr.length === 9) {
                result = 2;
            }
        }

        return result;
    }

    const playTurn = function (e) {
        handleClick(e);
        let res = checkBoard();
        play(res);
    }

    const play = function (res) {
        const header = document.querySelector('h2.turn');

        if (res === 0 || res === 1 || res === 2) {
            if (res === 0) {
                header.textContent = `${player1.name} is the winner!`;
            }

            else if (res === 1) {
                header.textContent = `${player2.name} is the winner!`;
            }

            else {
                header.textContent = `Its a draw.`;
            }

            const cells = document.querySelectorAll('.cell');

            cells.forEach((cell) => {
                cell.removeEventListener('click', playTurn);
            });
        }
    }

    const updateTurn = function (element) {
        if (player1.turn) {
            element.textContent = `${player1.name}'s turn.`;
        }

        else {
            element.textContent = `${player2.name}'s turn.`;
        }
    }

    const resetBoard = function () {
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell) => {
            if (cell.childNodes.length > 0) {
                cell.removeChild(cell.childNodes[0]);
                cell.style.backgroundColor = 'white';
            }
        });

        player1.turn = true;
        player2.turn = false;

        const sp = document.createElement('span');
        sp.classList.add('t');
        updateTurn(sp);

        console.log(sp);

        const header = document.querySelector('h2.turn');
        header.textContent = 'It is ';
        header.appendChild(sp);

        console.log(header);

        setUpBoard();

        const player1name = document.querySelector('h2.player1name');
        const player2name = document.querySelector('h2.player2name');

        player1name.textContent = `${player1.name} (X)`;
        player2name.textContent = `${player2.name} (O)`;
    }

    const resetButton = document.querySelector('.rst');
    resetButton.addEventListener('click', resetBoard);

    const main = function () {
        setUpBoard();
        board.playerInput();
    }

    return { main };
})();

let player1 = player('Player 1', true);
let player2 = player('Player 2', false);

game.main();