let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'circle';  // Start mit 'circle'
let player1 = '';
let player2 = '';
function init() {
    render();
    getPlayerNames();
}

function getPlayerNames() {
    player1 = prompt("Bitte geben Sie den Namen von Spieler 1 (O) ein:", "Spieler 1");
    player2 = prompt("Bitte geben Sie den Namen von Spieler 2 (X) ein:", "Spieler 2");

    if (!player1) player1 = "Spieler 1";  // Standardname, falls keine Eingabe erfolgt
    if (!player2) player2 = "Spieler 2";  // Standardname, falls keine Eingabe erfolgt

    updatePlayerInfo();
}

function updatePlayerInfo() {
    document.getElementById('player-info').innerText = `${currentPlayer === 'circle' ? player1 : player2} ist am Zug (${currentPlayer === 'circle' ? 'O' : 'X'})`;
}

function generateAnimatedCircleSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <!-- Hintergrundkreis -->
        <circle cx="35" cy="35" r="30" fill="none" stroke="#e0e0e0" stroke-width="5"/>
        
        <!-- Vordergrundkreis, der sich im Uhrzeigersinn füllt -->
        <circle cx="35" cy="35" r="30" fill="none" stroke="#00b0ef" stroke-width="5" stroke-dasharray="188.4" stroke-dashoffset="188.4">
            <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="0.5s" fill="freeze" />
        </circle>
        
        <!-- Kreiselement, das die Füllanimation darstellt -->
        <circle cx="35" cy="35" r="30" fill="none" stroke="#00b0ef" stroke-width="5">
            <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 188.4" dur="1s" fill="freeze" />
            <animate attributeName="fill" from="none" to="#00b0ef" dur="0.5s" begin="0.5s" fill="freeze" />
        </circle>
    </svg>`;
}

// Beispiel: SVG-Code in einen Container mit der ID "circle-container" einfügen
// document.getElementById('circle-container').innerHTML = generateAnimatedCircleSVG();



function generateAnimatedXSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="5" x2="25" y2="25" stroke="#00b0ef" stroke-width="5">
            <animate attributeName="stroke-dasharray" from="0, 28.28" to="28.28, 28.28" dur="0.5s" fill="freeze" />
        </line>
        <line x1="25" y1="5" x2="5" y2="25" stroke="#00b0ef" stroke-width="5">
            <animate attributeName="stroke-dasharray" from="0, 28.28" to="28.28, 28.28" dur="0.5s" fill="freeze" />
        </line>
    </svg>`;
}

// Beispiel: SVG-Code in einen Container mit der ID "x-container" einfügen
// document.getElementById('x-container').innerHTML = generateAnimatedXSVG();





function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateAnimatedCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateAnimatedXSVG();
            }
                tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
            }
            tableHTML += '</tr>';
        }

        tableHTML += '</table>';

        document.getElementById('content').innerHTML = tableHTML;
    }

    function handleClick(index) {
        if (!fields[index]) {  // Nur wenn das Feld leer ist
            fields[index] = currentPlayer;  // Setzt das Feld auf den aktuellen Spieler
            render();  // Rendert das Spielfeld neu
    
            setTimeout(() => {
                if (checkWin()) {
                    alert(`${currentPlayer === 'circle' ? player1 : player2} hat gewonnen!`);
                    resetGame();
                } else {
                    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';  // Wechselt den Spieler
                    updatePlayerInfo();  // Zeigt den nächsten Spieler an
                    checkGameOver();  // Überprüft, ob das Spiel vorbei ist
                }
            }, 500);  // Wartezeit von 500ms, passend zur Animationsdauer
        }
    }
    function checkGameOver() {
        let isGameOver = fields.every(field => field !== null);
        if (isGameOver) {
            setTimeout(() => {  // Setzt ein Timeout, um sicherzustellen, dass die letzte Animation angezeigt wird
                if (confirm("Das Spiel ist vorbei. Möchten Sie ein neues Spiel starten?")) {
                    resetGame();
                }
            }, 1000);
        }
    }
function checkWin() {
    let winningCombinations = [
        [0, 1, 2], // erste Reihe
        [3, 4, 5], // zweite Reihe
        [6, 7, 8], // dritte Reihe
        [0, 3, 6], // erste Spalte
        [1, 4, 7], // zweite Spalte
        [2, 5, 8], // dritte Spalte
        [0, 4, 8], // Diagonale von oben links nach unten rechts
        [2, 4, 6]  // Diagonale von oben rechts nach unten links
    ];

    return winningCombinations.some(combination => {
        let [a, b, c] = combination;
        return fields[a] && fields[a] === fields[b] && fields[a] === fields[c];
    });
}

function resetGame() {
    fields = [null, null, null, null, null, null, null, null, null];  // Setzt das Spielfeld zurück
    currentPlayer = 'circle';  // Startet wieder mit 'circle'
    render();  // Rendert das Spielfeld neu
}







