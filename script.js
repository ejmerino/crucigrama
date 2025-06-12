document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // --- TU DISEÑO ---
    // NO LO HE MODIFICADO. El motor de abajo está construido para funcionar
    // con ESTA lista, tal como tú la has definido.
    // =================================================================================
    const wordData = [
        // HORIZONTALES
        { clue: "Juego Compartido", answer: "CUPHEAD", row: 1, col: 3, dir: 'h', num: 2 },
        { clue: "Momento “medias de abejita” de Miky", answer: "PERRO", row: 3, col: 13, dir: 'h', num: 5 },
        { clue: "Muñeca que protagoniza una de tus películas favoritas", answer: "ANABELLE", row: 4, col: 0, dir: 'h', num: 6 },
        { clue: "Apellido de tu Actor favorito", answer: "DICAPRIO", row: 6, col: 0, dir: 'h', num: 8 },
        { clue: "Lugar donde nos conocimos", answer: "ESTADIO", row: 6, col: 13, dir: 'h', num: 10 },
        { clue: "Número de puente del primer beso", answer: "SEIS", row: 8, col: 3, dir: 'h', num: 12 },
        { clue: "Montaña escalada", answer: "ILALO", row: 8, col: 10, dir: 'h', num: 13 },
        { clue: "Cosa que nos encanta ver juntos", answer: "ATARDECER", row: 10, col: 3, dir: 'h', num: 14 },
        { clue: "Palabra que me dijiste anoche", answer: "RELOJ", row: 13, col: 10, dir: 'h', num: 16 },
        { clue: "Rival del primer partido juntos", answer: "CUMBAYA", row: 14, col: 2, dir: 'h', num: 18 },
        { clue: "Lugar especial", answer: "TERRAZA", row: 17, col: 3, dir: 'h', num: 19 },

        // VERTICALES
        { clue: "Color guante de espuma", answer: "VERDE", row: 0, col: 7, dir: 'v', num: 1 },
        { clue: "Licor Compartido", answer: "FERNET", row: 1, col: 15, dir: 'v', num: 3 },
        { clue: "Tu animal favorito", answer: "SERPIENTE", row: 3, col: 4, dir: 'v', num: 4 },
        { clue: "Marca de nuestras computadoras", answer: "DELL", row: 5, col: 13, dir: 'v', num: 7 },
        { clue: "Día de la primera cita", answer: "DOMINGO", row: 6, col: 0, dir: 'v', num: 8 },
        { clue: "Primer centro comercial que fuimos", answer: "QUICENTRO", row: 6, col: 10, dir: 'v', num: 9 },
        { clue: "Casa de Harry Potter", answer: "RAVENCLAW", row: 7, col: 8, dir: 'v', num: 11 },
        { clue: "Mes que nos vimos por primera vez", answer: "FEBRERO", row: 12, col: 5, dir: 'v', num: 15 },
        { clue: "Nombre dinosaurio", answer: "JOKY", row: 13, col: 14, dir: 'v', num: 17 },
    ];


    // =================================================================================
    // --- MOTOR DEL CRUCIGRAMA (NO TOCAR) ---
    // Este motor está diseñado para dibujar exactamente lo que definas arriba.
    // =================================================================================

    function initializeGrid() {
        const gridContainer = document.getElementById('grid-container');
        const acrossCluesList = document.querySelector('#across-clues .clues-list');
        const downCluesList = document.querySelector('#down-clues .clues-list');
        
        gridContainer.innerHTML = '';
        acrossCluesList.innerHTML = '';
        downCluesList.innerHTML = '';

        // 1. Determinar el tamaño de la cuadrícula
        let maxRow = 0;
        let maxCol = 0;
        wordData.forEach(word => {
            let endRow = word.row;
            let endCol = word.col;
            if (word.dir === 'h') { endCol += word.answer.length; } 
            else { endRow += word.answer.length; }
            if (endRow > maxRow) maxRow = endRow;
            if (endCol > maxCol) maxCol = endCol;
        });
    
        const grid = Array(maxRow).fill(null).map(() => Array(maxCol).fill(null));

        // 2. CREAR LA FORMA: Marcar todas las celdas que deben existir.
        wordData.forEach(word => {
            for (let i = 0; i < word.answer.length; i++) {
                const r = word.dir === 'v' ? word.row + i : word.row;
                const c = word.dir === 'h' ? word.col + i : word.col;
                if (r < maxRow && c < maxCol) {
                    if (!grid[r][c]) {
                        grid[r][c] = {}; // Crea la celda si no existe.
                    }
                }
            }
        });

        // 3. RELLENAR DATOS: Añadir las letras y números a las celdas ya creadas.
        wordData.forEach(word => {
            for (let i = 0; i < word.answer.length; i++) {
                const r = word.dir === 'v' ? word.row + i : word.row;
                const c = word.dir === 'h' ? word.col + i : word.col;
                if (grid[r] && grid[r][c]) {
                    // Asigna la letra.
                    if (!grid[r][c].letter) {
                        grid[r][c].letter = word.answer[i].toUpperCase();
                    } else if (grid[r][c].letter !== word.answer[i].toUpperCase()) {
                        console.warn(`Conflicto en [${r}, ${c}]: Letra existente '${grid[r][c].letter}' vs nueva letra '${word.answer[i].toUpperCase()}'.`);
                    }
                    // Asigna el número.
                    if (i === 0) {
                        if (!grid[r][c].number) {
                            grid[r][c].number = word.num;
                        }
                    }
                }
            }
        });
        
        // 4. Muestra las pistas
        const horizontalClues = wordData.filter(w => w.dir === 'h').sort((a, b) => a.num - b.num);
        const verticalClues = wordData.filter(w => w.dir === 'v').sort((a, b) => a.num - b.num);
        horizontalClues.forEach(word => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${word.num}.</strong> ${word.clue}`;
            acrossCluesList.appendChild(li);
        });
        verticalClues.forEach(word => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${word.num}.</strong> ${word.clue}`;
            downCluesList.appendChild(li);
        });

        // 5. Dibuja la tabla HTML final
        for (let i = 0; i < maxRow; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < maxCol; j++) {
                const td = document.createElement('td');
                td.classList.add('grid-cell');
                
                if (grid[i][j]) { // SI LA CELDA EXISTE EN LA PLANTILLA, SE DIBUJA CON UN INPUT.
                    td.classList.add('word-cell');
                    if (grid[i][j].number) {
                        const numberSpan = document.createElement('span');
                        numberSpan.textContent = grid[i][j].number;
                        numberSpan.classList.add('cell-number');
                        td.appendChild(numberSpan);
                    }
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.classList.add('cell-input');
                    input.dataset.answer = grid[i][j].letter || '';
                    td.appendChild(input);
                }
                tr.appendChild(td);
            }
            gridContainer.appendChild(tr);
        }
    }

    // Función para verificar las respuestas
    function checkAnswers() {
        const inputs = document.querySelectorAll('.cell-input');
        let allCorrect = true;
        
        if (inputs.length === 0) {
            allCorrect = false;
            return;
        }
        inputs.forEach(input => {
            input.classList.remove('correct', 'incorrect');
            if (input.value.toUpperCase() === input.dataset.answer) {
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            document.getElementById('win-message').style.display = 'flex';
        }
    }

    initializeGrid();
    document.getElementById('check-btn').addEventListener('click', checkAnswers);
});