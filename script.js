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
        const player1 = document.querySelector('.player1name');
        const player2 = document.querySelector('.player2name');
        const name1 = document.querySelector('#name1');
        const name2 = document.querySelector('#name2');
        const enterButtons = document.querySelectorAll('[type="submit"]');

        function changePlayerName(player, name) {
            let newName = name;

            if (player.classList[0].includes('1')) {
                newName += ' (X)'
            }

            else {
                newName += ' (O)'
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

board.playerInput();