import { hexagramData } from './data/hexagramData.js';
import { trigramData } from './data/trigramData.js';

class Hexagram {
    /**
     * @param {*} castMethod - The method used to cast the hexagram: coin, plum
     * @param {Array} hexagramLines - The lines of the hexagram
     * @param {Array} changingLines - The lines that are changing
     * @param {boolean} completed - Indicates if the casting is completed
     * @param {number} currentLine - The current line being cast
     * @param {Object} hexagram - The hexagram object
     * @param {Object} changedHexagram - The hexagram object after changes
     * @description
     * This class represents a hexagram in the I Ching system.
     * It provides methods to cast a hexagram using different methods (coin or plum),
     * to retrieve the hexagram and its changed version, and to reset the casting process.
     * 
    */
    constructor() {
        this.castMethod = null;
        this.hexagramLines = [];
        this.changingLines = [];
        this.completed = false;
        this.currentLine = 1;

        this.hexagram = null;
        this.changedHexagram = null;
    }

    getHexagram() {
        if (this.hexagram) {
            return this.hexagram;
        }

        // If the hexagram is not set, we need to find it based on the current hexagram lines.
        // Check if the hexagram is completed and has 6 lines
        if (this.completed && this.hexagramLines.length === 6) {
            // Because the hexagram lines are built from bottom to top,
            // we need to reverse them to match the I Ching representation.
            this.hexagram ||= hexagramData.find(h => h.key === this.hexagramLines.join(""));

            return this.hexagram;
        }
        return null;
    }

    getChangedLines() {
        if (this.hexagramLines.length !== 6) {
            return [];
        }

        const changedLines = this.hexagramLines.slice();
        this.changingLines.forEach(linePos => {
            changedLines[linePos] = changedLines[linePos] === 0 ? 1 : 0;
        });
        return changedLines;
    }

    getChangedLines() {
        if (this.changedLines.length) {
            return this.changedLines;
        }

        // If the changing lines are empty, we don't need to change anything
        if (this.changingLines.length === 0 || this.hexagramLines.length !== 6) {
            return [];
        }

        this.changedLines = this.hexagramLines.slice();
        this.changingLines.forEach(linePos => {
            this.changedLines[linePos - 1] = this.changedLines[linePos - 1] === 0 ? 1 : 0;
        });

        return this.changedLines;
    }

    getChangedHexagram() {
        if (this.changedHexagram) {
            return this.changedHexagram;
        }

        // If the changed hexagram is not set, we need to find it based on the current changed lines.
        // Check if the hexagram is completed and has 6 lines
        if (this.completed && this.hexagramLines.length === 6) {
            const changedHexagramKey = this.getChangedLines().join("");
            this.changedHexagram ||= hexagramData.find(h => h.key === changedHexagramKey);

            return this.changedHexagram;
        }
        return null;
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
        this.reset();

        return this;
    }

    /**
     * @description
     * This method initializes the plum casting method with the provided numbers.
     * The numbers should be an array of three integers.
     * The first number represents the upper trigram, the second number represents the lower trigram,
     * and the third number is used to determine the changing line.
     * 
     * The numbers are used to generate the hexagram lines.
     * The method also resets the hexagram state.
     * 
     * @param {Array} numbers - The numbers to be used for the plum method
     * @returns {Hexagram} - The current instance of the Hexagram class
     * @example
     * const hexagram = new Hexagram();
     * hexagram.startPlumMethod([1, 2, 3]);
     */
    startPlumMethod() {
        this.castMethod = "plum";
        this.reset();

        return this;
    }

    /**
     * Cast the hexagram using the selected method (coin or plum)
     * 
     * @description
     * This method casts the hexagram using the selected method (coin or plum).
     * It generates the hexagram lines and determines the changing lines.
     * If the casting is completed, it returns the hexagram and its changed version.
     * 
     * Flags:
     * - `completed`: Indicates if the casting is completed. If true,
     *  the casting process is finished, else call the method again.
     * 
     * @returns {Object} - The result of the casting
     */
    cast(data = []) {
        if (this.getHexagram()) {
            return {
                hexagram: this.getHexagram(),
                changedHexagram: this.getChangedHexagram(),
                hexagramLines: this.hexagramLines,
                changingLines: this.changingLines,
                changedLines: this.getChangedLines(),
                castMethod: this.castMethod,
            };
        }

        if (this.castMethod === "coin") {
            return this.castWithCoins(data);
        } else if (this.castMethod === "plum") {
            return this.castWithPlum(data);
        }
    }


    /**
     * @description
     * This method simulates tossing three coins.
     * It returns an array of three integers, where 0 represents tails and 1 represents heads.
     * 
     * @returns {Array} - The results of the coin toss
     */
    tossCoins() {
        const currentTossCoins = [0, 0, 0];

        if (this.completed) {
            throw new Error("Số lần gieo đã hoàn thành.");
        }

        // Simulate tossing three coins
        // 0 = tails, 1 = heads
        for (let i = 0; i < 3; i++) {
            currentTossCoins[i] = Math.floor(Math.random() * 2);
        }

        this.currentLine++;
        if (this.currentLine > 6) {
            this.completed = true;
        }

        return {
            completed: this.completed,
            currentTossCoins: currentTossCoins,
            currentLine: this.currentLine - 1,
        };
    }

    /**
     * 
     * @param {Array} tossCoinResults - The results of the coin toss
     * @description
     * This method casts the hexagram using the coin method.
     * It generates the hexagram lines and determines the changing lines.
     * @returns {Object} - The result of the casting
     * @example
     * const hexagram = new Hexagram();
     * hexagram.startCoinMethod();
     * const result = hexagram.castWithCoins([[0, 1, 0], [1, 0, 1], [0, 0, 0], [1, 1, 1], [0, 1, 1], [1, 0, 0]]);
     */
    castWithCoins(tossCoinResults = []) {
        if (tossCoinResults.length !== 6) {
            throw new Error("Phương pháp Tung Đồng Xu yêu cầu 6 lần gieo.");
        }

        for (let line = 0; line < tossCoinResults.length; line++) {
            const tossedResult = tossCoinResults[line];
            const headsCount = tossedResult.filter(r => r === 0).length;
            const isChanging = headsCount === 3 || headsCount === 0;
            // 2, 3 heads = 0 (yin); 0, 1 heads = 1 (yang)
            const lineType = [2, 3].includes(headsCount) ? 0 : 1;

            // Note: The hexagram lines are built from bottom to top, so
            // we need to reverse them to match the I Ching representation.
            this.hexagramLines.push(lineType);
            if (isChanging) {
                this.changingLines.push(line + 1);
            }
        };

        console.log({ changingLines: this.changingLines });
        console.log({ hexagramLines: this.hexagramLines });

        return {
            hexagram: this.getHexagram(),
            changedHexagram: this.getChangedHexagram(),
            hexagramLines: this.hexagramLines,
            changingLines: this.changingLines,
            changedLines: this.getChangedLines(),
            castMethod: this.castMethod,
        }
    }

    /**
     * @description
     * This method casts the hexagram using the plum method.
     * It generates the hexagram lines and determines the changing lines.
     * 
     * @param {Array} numbers - The numbers to be used for the plum method
     * @returns {Object} - The result of the casting
     */
    castWithPlum(numbers = []) {
        if (numbers.length != 3) {
            throw new Error("Phương pháp lập quẻ Mai Hoa yêu cầu 3 số.");
        }

        const upperNum = numbers[0] % 8 || 8;
        const lowerNum = numbers[1] % 8 || 8;
        const changingLineNum = numbers.reduce((a, n) => a + Math.abs(n)) % 6 || 6;

        const upperNum2Binary = trigramData[upperNum - 1];
        const lowerNum2Binary = trigramData[lowerNum - 1];

        // Generate hexagram lines
        this.hexagramLines = [...upperNum2Binary].reverse().concat([...lowerNum2Binary].reverse());

        // Determine changing lines
        this.changingLines.push(changingLineNum);

        // For the plum method, completed is always true
        this.completed = true;

        return {
            hexagram: this.getHexagram(),
            changedHexagram: this.getChangedHexagram(),
            hexagramLines: this.hexagramLines,
            changingLines: this.changingLines,
            changedLines: this.getChangedLines(),
            castMethod: this.castMethod,
        }
    }
}

export { Hexagram };