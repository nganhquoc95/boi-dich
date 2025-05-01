import { hexagramData } from './data/hexagramData.js';
import { trigramData } from './data/trigramData.js';

class Hexagram {
    /**
     * @param {*} castMethod - The method used to cast the hexagram: coin, plumb
     * @param {*} castMethodOptions - Options for the casting method
     * @param {Array} hexagramLines - The lines of the hexagram
     * @param {Array} changingLines - The lines that are changing
     * @param {boolean} completed - Indicates if the casting is completed
     * @param {number} currentLine - The current line being cast
     * @param {Object} hexagram - The hexagram object
     * @param {Object} changedHexagram - The hexagram object after changes
     * @description
     * This class represents a hexagram in the I Ching system.
     * It provides methods to cast a hexagram using different methods (coin or plumb),
     * to retrieve the hexagram and its changed version, and to reset the casting process.
     * 
    */
    constructor() {
        this.castMethod = null;
        this.castMethodOptions = null;

        this.hexagramLines = [];
        this.changingLines = [];
        this.completed = false;
        this.currentLine = 1;

        this.hexagram = null;
        this.changedHexagram = null;
    }

    getHexagram() {
        return this.hexagram || null;
    }

    getChangedHexagram() {
        return this.changedHexagram || null;
    }

    reset() {
        this.hexagramLines = [];
        this.changingLines = [];
        this.changedLines = [];
        this.completed = false;
        this.hexagram = null;
        this.changedHexagram = null;
        this.currentLine = 1;
    }

    /**
     * @description
     * This method initializes the coin casting method.
     * It sets the casting method to "coin" and resets the hexagram state.
     * 
     * @returns {Hexagram} - The current instance of the Hexagram class
     * @example
     * const hexagram = new Hexagram();
     * hexagram.startCoinMethod();
     */
    startCoinMethod() {
        this.castMethod = "coin";
        this.castMethodOptions = {};
        this.reset();

        return this;
    }

    /**
     * @description
     * This method initializes the plumb casting method with the provided numbers.
     * The numbers should be an array of three integers.
     * The first number represents the upper trigram, the second number represents the lower trigram,
     * and the third number is used to determine the changing line.
     * 
     * The numbers are used to generate the hexagram lines.
     * The method also resets the hexagram state.
     * 
     * @param {Array} numbers - The numbers to be used for the plumb method
     * @returns {Hexagram} - The current instance of the Hexagram class
     * @example
     * const hexagram = new Hexagram();
     * hexagram.startPlumbMethod([1, 2, 3]);
     */
    startPlumbMethod(numbers = []) {
        this.castMethod = "plumb";
        this.castMethodOptions = { numbers: [...numbers] };
        this.reset();

        return this;
    }

    /**
     * Cast the hexagram using the selected method (coin or plumb)
     * 
     * @description
     * This method casts the hexagram using the selected method (coin or plumb).
     * It generates the hexagram lines and determines the changing lines.
     * If the casting is completed, it returns the hexagram and its changed version.
     * 
     * Flags:
     * - `completed`: Indicates if the casting is completed. If true,
     *  the casting process is finished, else call the method again.
     * 
     * @returns {Object} - The result of the casting
     */
    cast() {
        if (this.completed) {
            return {
                hexagram: this.hexagram,
                changedHexagram: this.changedHexagram,
                hexagramLines: this.hexagramLines,
                changingLines: this.changingLines,
                plumbNumbers: this.castMethodOptions.numbers,
                castMethod: this.castMethod,
                currentLine: this.castMethod === "coin" ? this.currentLine - 1 : null,
                completed: this.completed
            };
        }

        if (this.castMethod === "coin") {
            return this.castWithCoins();
        } else if (this.castMethod === "plumb") {
            return this.castWithPlumb();
        }
    }

    castWithCoins() {
        const tossResults = this.tossCoins();
        const headsCount = tossResults.filter(r => r === 0).length;
        const isChanging = headsCount === 3 || headsCount === 0;
        const lineType = headsCount % 2 === 0 ? 0 : 1;

        // Note: The hexagram lines are built from bottom to top, so we need to reverse them
        // to match the I Ching representation.
        this.hexagramLines.unshift(lineType);
        if (isChanging) {
            this.changingLines.push(this.currentLine);
        }

        if (this.currentLine < 6) {
            this.currentLine++;
        } else {
            this.completed = true;
            this.setTossCoinResult();
        }

        return {
            hexagram: this.getHexagram(),
            changedHexagram: this.getChangedHexagram(),
            currentLine: this.currentLine - (this.completed ? 0 : 1),
            plumbNumbers: this.castMethodOptions.numbers,
            castMethod: this.castMethod,
            hexagramLines: this.hexagramLines,
            changingLines: [...this.changingLines],
            changedLines: this.changedLines,
            completed: this.completed,
        };
    }

    /**
     * @description
     * This method simulates tossing three coins.
     * It returns an array of three integers, where 0 represents tails and 1 represents heads.
     * 
     * @returns {Array} - The results of the coin toss
     */
    tossCoins() {
        const tossResults = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            const result = Math.floor(Math.random() * 2);
            tossResults[i] = result;
        }

        return tossResults;
    }

    /**
     * @description
     * This method sets the hexagram and changed hexagram based on the current hexagram lines.
     * It generates the changed hexagram by flipping the changing lines.
     */
    setTossCoinResult() {
        // Generate changed hexagram by flipping changing lines
        const reversedHexagramLines = [...this.hexagramLines].reverse();
        const changedLines = [...reversedHexagramLines];

        this.changingLines.forEach(linePos => {
            changedLines[linePos] = changedLines[linePos] === 0 ? 1 : 0;
        });

        this.changedLines = [...changedLines].reverse();
        this.hexagram = hexagramData.find(h => h.key === reversedHexagramLines.join(""));
        this.changedHexagram = hexagramData.find(h => h.key === changedLines.join(""));
    }

    /**
     * @description
     * This method casts the hexagram using the plumb method.
     * It generates the hexagram lines and determines the changing lines.
     * 
     * @returns {Object} - The result of the casting
     */
    castWithPlumb() {
        const numbers = this.castMethodOptions.numbers;
        const upperNum = numbers[0] % 8 || 8;
        const lowerNum = numbers[1] % 8 || 8;
        const changingLineNum = numbers.reduce((a, n) => a + Math.abs(n)) % 6 || 6;

        const upperNum2Binary = trigramData[upperNum - 1];
        const lowerNum2Binary = trigramData[lowerNum - 1];

        // Generate hexagram lines
        this.hexagramLines = [...lowerNum2Binary].reverse().concat([...upperNum2Binary].reverse());
        // Set changing line (1-based index)
        this.changingLines.push(changingLineNum - 1); // convert to 0-based

        // Generate changed hexagram by flipping the changing line
        this.changedLines = [...this.hexagramLines];
        this.changedLines[Math.abs(changingLineNum - 1)] = this.changedLines[Math.abs(changingLineNum - 1)] === 0 ? 1 : 0;

        // Find hexagrams based on keys
        this.hexagram = hexagramData.find(h => h.key === this.hexagramLines.join(""));
        this.changedHexagram = hexagramData.find(h => h.key === this.changedLines.join(""));

        return {
            hexagram: this.getHexagram(),
            changedHexagram: this.getChangedHexagram(),
            currentLine: null,
            plumbNumbers: [...this.castMethodOptions.numbers],
            castMethod: this.castMethod,
            hexagramLines: this.hexagramLines,
            changingLines: [changingLineNum],
            changedLines: this.changedLines,
            completed: true,
        };
    }
}

export { Hexagram };