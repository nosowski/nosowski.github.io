class SlotsGame {
    constructor() {
        this.board = [];
        this.symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
        this.initializeBoard();
        this.setupEventListeners();
    }

    initializeBoard() {
        const gameBoard = document.getElementById('game-board');
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                const slot = document.createElement('div');
                slot.className = 'slot';
                gameBoard.appendChild(slot);
                this.board[i][j] = '';
            }
        }
    }

    setupEventListeners() {
        const spinButton = document.getElementById('spin-button');
        spinButton.addEventListener('click', () => this.spin());
    }

    spin() {
        this.removeHighlights();
        const slots = document.querySelectorAll('.slot');
        const spinButton = document.getElementById('spin-button');
        spinButton.disabled = true;

        let animationCount = 0;
        const totalAnimations = 20;

        const animate = () => {
            slots.forEach((slot, index) => {
                const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                slot.textContent = randomSymbol;
            });

            animationCount++;

            if (animationCount < totalAnimations) {
                setTimeout(animate, 50);
            } else {
                this.finalizeSpinResult(slots);
            }
        };

        animate();
    }

    finalizeSpinResult(slots) {
        slots.forEach((slot, index) => {
            const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            slot.textContent = randomSymbol;
            this.board[Math.floor(index / 3)][index % 3] = randomSymbol;
        });

        this.checkWin();
        document.getElementById('spin-button').disabled = false;
    }

    checkWin() {
        const resultElement = document.getElementById('result');
        resultElement.textContent = '';

        // Sprawdzanie poziomych linii
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
                this.displayWin(`BRAWO GEJU! WYGRALES TALON`);
                this.highlightWinningSlots('horizontal', i);
                return;
            }
        }

        // Sprawdzanie skośnych linii
        if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            this.displayWin('BRAWO GEJU! WYGRALES TALON');
            this.highlightWinningSlots('diagonal-right');
            return;
        }
        if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            this.displayWin('BRAWO GEJU! WYGRALES TALON');
            this.highlightWinningSlots('diagonal-left');
            return;
        }

        this.displayWin('Pizda jestes, a nie skoczek!');
    }

    displayWin(message) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = message;
    }

    highlightWinningSlots(type, row) {
        const slots = document.querySelectorAll('.slot');
        switch(type) {
            case 'horizontal':
                for (let i = 0; i < 3; i++) {
                    slots[row * 3 + i].classList.add('winning');
                }
                break;
            case 'diagonal-right':
                for (let i = 0; i < 3; i++) {
                    slots[i * 4].classList.add('winning');
                }
                break;
            case 'diagonal-left':
                for (let i = 0; i < 3; i++) {
                    slots[2 + i * 2].classList.add('winning');
                }
                break;
        }
    }

    removeHighlights() {
        document.querySelectorAll('.slot').forEach(slot => {
            slot.classList.remove('winning');
        });
    }
}

new SlotsGame();
