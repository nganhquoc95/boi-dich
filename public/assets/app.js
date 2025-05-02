import { Hexagram } from './Hexagram.js';
import { SolarDate } from './LunarDate.js';

// DOM elements
const questionInput = document.getElementById('question-input');
const castButton = document.getElementById('cast-button');
const coinTossSection = document.getElementById('coin-toss-section');
const currentLineDisplay = document.getElementById('current-line');
const tossButton = document.getElementById('toss-button');
const coins = [document.getElementById('coin1'), document.getElementById('coin2'), document.getElementById('coin3')];
const resultSection = document.getElementById('result-section');
const dateOfHexagramDisplay = document.getElementById('date-of-hexagram');
const userQuestionDisplay = document.getElementById('user-question');
const methodUsedDisplay = document.getElementById('method-used');
const mainHexagramDisplay = document.getElementById('main-hexagram-display');
const mainHexagramName = document.getElementById('main-hexagram-name');
const mainHexagramNumber = document.getElementById('main-hexagram-number');
const mainHexagramJudgment = document.getElementById('main-hexagram-judgment');
const changedHexagramDisplay = document.getElementById('changed-hexagram-display');
const changedHexagramName = document.getElementById('changed-hexagram-name');
const changedHexagramNumber = document.getElementById('changed-hexagram-number');
const changedHexagramJudgment = document.getElementById('changed-hexagram-judgment');
const hexagramAdvice = document.getElementById('hexagram-advice');
const newCastButton = document.getElementById('new-cast-button');
const saveButton = document.getElementById('save-button');
const savedReadings = document.getElementById('saved-readings');
const savedList = document.getElementById('saved-list');
const methodTabs = document.querySelectorAll('.method-tab');
const methodContents = document.querySelectorAll('.method-content');
const plumNumberInputs = [
    document.getElementById('plum-number1'),
    document.getElementById('plum-number2'),
    document.getElementById('plum-number3')
];

// State
let currentMethod = 'coin'; // 'coin' or 'plum'
let currentHexagram = null;
let changingLines = [];
let changedHexagram = null;
let tossResults = []; // 0 = tails, 1 = heads
let currentLine = 1;
let hexagramLines = [];
let savedHexagrams = JSON.parse(localStorage.getItem('savedHexagrams')) || [];
let solarDate = null;

const hexagramInstance = new Hexagram();

// Event listeners
castButton.addEventListener('click', startCasting);
tossButton.addEventListener('click', tossCoins);
newCastButton.addEventListener('click', resetCasting);
saveButton.addEventListener('click', saveReading);

// Method tab switching
methodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const method = tab.getAttribute('data-method');
        switchMethod(method);
    });
});

// Prevent non-numeric input in plum blossom fields
plumNumberInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (e.target.value > 999) e.target.value = 999;
        if (e.target.value < 0 && e.target.value !== '') e.target.value = 0;
    });
});

// Functions
function switchMethod(method) {
    currentMethod = method;

    // Update UI
    methodTabs.forEach(tab => {
        if (tab.getAttribute('data-method') === method) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    methodContents.forEach(content => {
        if (content.id === `${method}-method`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // Reset inputs
    const tempQuestion = questionInput.value;
    resetCasting();
    questionInput.value = tempQuestion;
}

function startCasting() {
    const question = questionInput.value.trim();
    const isCoinMethod = currentMethod === 'coin';

    if (castButton.textContent === 'Gieo Lại') {
        resetCasting();
        questionInput.value = question;
        return;
    }

    if (!question) {
        alert('Vui lòng nhập câu hỏi của bạn trước khi gieo quẻ.');
        return;
    }

    if (!isCoinMethod && !isPlumMethodValid()) {
        alert('Vui lòng nhập tất cả các số cho phương pháp Mai Hoa Dịch Số.');
        return;
    }

    solarDate = new SolarDate(new Date());
    const lunarDate = solarDate.toLunarDate();
    hexagramInstance.setSolarDate(solarDate);

    dateOfHexagramDisplay.innerHTML = `
        Ngày (Dương): ${solarDate.day}/${solarDate.month}/${solarDate.year}
        <br>
        Ngày (Âm): ${lunarDate.day}/${lunarDate.month}/${lunarDate.year}
        <br>
        Giờ: ${lunarDate.getHourName()} -
        Ngày: ${lunarDate.getDayName()} -
        Tháng: ${lunarDate.getMonthName()} -
        Năm: ${lunarDate.getYearName()}
    `;

    userQuestionDisplay.textContent = `Hỏi: "${question}"`;
    questionInput.disabled = true;
    // castButton.disabled = true;

    castButton.textContent = 'Gieo Lại';

    if (isCoinMethod) {
        methodUsedDisplay.textContent = 'Phương pháp: Gieo quẻ đồng xu';
        startCoinMethod();
    } else {
        methodUsedDisplay.textContent = 'Phương pháp: Mai Hoa Dịch Số';
        startPlumMethod();
    }

    // Scroll to coin toss section
    coinTossSection.scrollIntoView({ behavior: 'smooth' });
}

function startCoinMethod() {
    hexagramLines = [];
    changingLines = [];
    currentLine = 1;
    currentLineDisplay.textContent = currentLine;

    // Start the coin toss
    hexagramInstance.startCoinMethod();

    // Reset coins
    tossResults = [];

    coins.forEach(coin => {
        coin.classList.remove('tossing', 'coin-tails');
        coin.classList.add('coin-heads');
        coin.textContent = 'H';
    });

    tossButton.disabled = false;
    coinTossSection.classList.remove('hidden');
}

const isPlumMethodValid = () => {
    const numbers = [
        parseInt(plumNumberInputs[0].value),
        parseInt(plumNumberInputs[1].value),
        parseInt(plumNumberInputs[2].value)
    ];

    return !numbers.some(isNaN);
}

function startPlumMethod() {
    const numbers = [
        parseInt(plumNumberInputs[0].value),
        parseInt(plumNumberInputs[1].value),
        parseInt(plumNumberInputs[2].value)
    ];

    hexagramInstance.startPlumMethod();
    const data = hexagramInstance.cast(numbers);

    hexagramLines = data.hexagramLines;
    changingLines = data.changingLines;
    currentHexagram = data.hexagram;
    changedHexagram = data.changedHexagram;

    // Display results
    displayResults({
        hexagramLines,
        changingLines,
        changedLines: data.changedLines,
        familyLines: currentHexagram.familyLines,
        changedFamilyLines: changedHexagram.familyLines
    });
}

function tossCoins() {
    // Start tossing animation
    coins.forEach(coin => {
        coin.classList.add('tossing');
        coin.textContent = '';
    });

    tossButton.disabled = true;

    // Stop tossing after 1.5 seconds and show results
    setTimeout(() => {
        const {
            completed,
            currentTossCoins,
            currentLine,
        } = hexagramInstance.tossCoins();

        tossResults.push(currentTossCoins);

        if (!completed) {
            coins.forEach((coin, index) => {
                coin.classList.remove('tossing');
    
                if (currentTossCoins[index] === 1) {
                    coin.classList.remove('coin-tails');
                    coin.classList.add('coin-heads');
                    coin.textContent = 'H';
                } else {
                    coin.classList.remove('coin-heads');
                    coin.classList.add('coin-tails');
                    coin.textContent = 'T';
                }
            });
            tossButton.disabled = false;
            // Update current line display
            currentLineDisplay.textContent = currentLine + 1;
            return;
        }

        const data = hexagramInstance.cast(tossResults);

        hexagramLines = data.hexagramLines;
        changingLines = data.changingLines;
        currentHexagram = data.hexagram;
        changedHexagram = data.changedHexagram;

        displayResults({
            hexagramLines,
            changingLines,
            changedLines: data.changedLines,
            familyLines: currentHexagram.familyLines,
            changedFamilyLines: changedHexagram.familyLines
        });
    }, 1500);
}

function displayResults({ hexagramLines, changingLines, changedLines, familyLines = [], changedFamilyLines = [] }) {
    // Display main hexagram
    displayHexagram({
        container: mainHexagramDisplay,
        hexagramLines: hexagramLines,
        hexagramFamilyLines: familyLines,
        changingLines: changingLines
    });
    mainHexagramName.textContent = `${currentHexagram.name}`;
    mainHexagramNumber.textContent = `Số: ${currentHexagram.number}`;
    mainHexagramJudgment.innerHTML = `<p>${currentHexagram.judgment}</p>`;

    // Display changed hexagram if there are changing lines
    if (changingLines.length > 0) {
        // displayHexagram(changedHexagramDisplay, changedLines);
        displayHexagram({
            container: changedHexagramDisplay,
            hexagramLines: changedLines,
            hexagramFamilyLines: changedFamilyLines,
        });
        changedHexagramName.textContent = `${changedHexagram.name}`;
        changedHexagramNumber.textContent = `Số: ${changedHexagram.number}`;
        changedHexagramJudgment.innerHTML = `<p>${changedHexagram.judgment}</p>`;
        document.getElementById('changing-section').classList.remove('hidden');
    } else {
        document.getElementById('changing-section').classList.add('hidden');
    }

    // Generate combined advice
    let advice = currentHexagram.advice;
    if (changingLines.length > 0) {
        advice += `<br><br>Với hào động, ${changedHexagram.advice.toLowerCase()}`;
    }
    hexagramAdvice.innerHTML = `<p>${advice}</p>`;

    // Show results
    coinTossSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    // Show saved readings if any
    if (savedHexagrams.length > 0) {
        savedReadings.classList.remove('hidden');
        displaySavedReadings();
    }
}

function displayHexagram({ container, hexagramLines, hexagramFamilyLines = [], changingLines = [] }) {
    container.innerHTML = '';

    const containerHexagram = document.createElement('div');
    containerHexagram.className = 'hexagram';
    container.appendChild(containerHexagram);

    const containerHexagramLines = document.createElement('div');
    containerHexagramLines.className = 'hexagram-lines text-left ml-4';
    container.appendChild(containerHexagramLines);

    // Create the lines (from bottom to top for correct display)
    for (let i = 5; i >= 0; i--) {
        const line = document.createElement('div');
        const familyLine = document.createElement('div');
        familyLine.textContent = hexagramFamilyLines[5 - i] || '';

        // Changing lines are 1-indexed, so we need to adjust for 0-indexed array
        const isChanging = changingLines.includes(i + 1);

        if (hexagramLines[i] === 0) {
            line.className = isChanging ? 'yin-line broken moving-line' : 'yin-line broken';
        } else {
            line.className = isChanging ? 'yang-line moving-line' : 'yang-line';
        }

        containerHexagram.appendChild(line);
        containerHexagramLines.appendChild(familyLine);
    }
}

function resetCastButton() {
    castButton.disabled = false;
    castButton.textContent = '';
    const icon = document.createElement('i');
    icon.className = 'fas fa-coins mr-2';
    castButton.appendChild(icon);
    castButton.appendChild(document.createTextNode('Gieo Quẻ'));
}

function resetCasting() {
    questionInput.value = '';
    questionInput.disabled = false;
    resetCastButton();
    resultSection.classList.add('hidden');
    coinTossSection.classList.add('hidden');

    // Reset plum blossom inputs
    plumNumberInputs.forEach(input => input.value = '');

    // Reset coins
    tossResults = [];
    coins.forEach(coin => {
        coin.classList.remove('tossing', 'coin-tails');
        coin.classList.add('coin-heads');
        coin.textContent = 'H';
    });

    tossButton.disabled = false;
    currentHexagram = null;
    changingLines = [];
    hexagramLines = [];
    currentLine = 1;
}

function saveReading() {
    if (!currentHexagram) return;

    const reading = {
        method: currentMethod,
        hexagram: currentHexagram,
        changedHexagram: changedHexagram,
        changingLines: [...changingLines],
        question: userQuestionDisplay.textContent,
        date: new Date().toLocaleString()
    };

    savedHexagrams.push(reading);
    localStorage.setItem('savedHexagrams', JSON.stringify(savedHexagrams));

    alert('Đã lưu kết quả gieo quẻ!');
    savedReadings.classList.remove('hidden');
    displaySavedReadings();
}

function displaySavedReadings() {
    savedList.innerHTML = '';

    savedHexagrams.forEach((reading, index) => {
        const readingElement = document.createElement('div');
        readingElement.className = 'bg-amber-50 p-4 rounded-lg border border-amber-200';

        let changingLinesText = '';
        if (reading.changingLines && reading.changingLines.length > 0) {
            const lines = reading.changingLines.map(pos => 6 - pos).join(', ');
            changingLinesText = `<p class="text-gray-700 text-sm">Hào động: ${lines}</p>`;
        }

        readingElement.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h3 class="font-semibold text-amber-800">${reading.hexagram.name}</h3>
                    ${reading.changedHexagram ?
                `<p class="text-gray-700 text-sm">Biến thành: ${reading.changedHexagram.name}</p>` : ''}
                    ${changingLinesText}
                </div>
                <div class="text-right">
                    <span class="text-sm text-gray-500">${reading.date}</span>
                    <p class="text-xs text-gray-500">${reading.method === 'coin' ? 'Đồng xu' : 'Mai Hoa'}</p>
                </div>
            </div>
            <p class="text-gray-700 mb-2"><span class="font-medium">Câu hỏi:</span> ${reading.question}</p>
            <button onclick="viewSavedReading(${index})" class="text-amber-600 hover:text-amber-800 text-sm font-medium">
                <i class="fas fa-eye mr-1"></i>Xem chi tiết
            </button>
            <button onclick="deleteSavedReading(${index})" class="text-red-500 hover:text-red-700 text-sm font-medium ml-4">
                <i class="fas fa-trash-alt mr-1"></i>Xóa
            </button>
        `;
        savedList.appendChild(readingElement);
    });
}

// These need to be global to be callable from onclick attributes
window.viewSavedReading = function (index) {
    if (index >= 0 && index < savedHexagrams.length) {
        const reading = savedHexagrams[index];
        currentHexagram = reading.hexagram;
        changedHexagram = reading.changedHexagram;
        changingLines = reading.changingLines || [];

        // Generate lines for display
        const mainLines = currentHexagram.key.split('').map(Number);
        const changedLines = changedHexagram.key.split('').map(Number);

        // Display
        displayHexagram(mainHexagramDisplay, mainLines, changingLines);
        mainHexagramName.textContent = `Quẻ: ${currentHexagram.name}`;
        mainHexagramNumber.textContent = `Số: ${currentHexagram.number}`;
        mainHexagramJudgment.innerHTML = `<p>${currentHexagram.judgment}</p>`;

        if (changingLines.length > 0 && changedHexagram) {
            displayHexagram(changedHexagramDisplay, changedLines);
            changedHexagramName.textContent = `Quẻ: ${changedHexagram.name}`;
            changedHexagramNumber.textContent = `Số: ${changedHexagram.number}`;
            changedHexagramJudgment.innerHTML = `<p>${changedHexagram.judgment}</p>`;
            document.getElementById('changing-section').classList.remove('hidden');
        } else {
            document.getElementById('changing-section').classList.add('hidden');
        }

        userQuestionDisplay.textContent = reading.question;
        methodUsedDisplay.textContent = `Phương pháp: ${reading.method === 'coin' ? 'Gieo quẻ đồng xu' : 'Mai Hoa Dịch Số'}`;

        // Generate combined advice
        let advice = currentHexagram.advice;
        if (changingLines.length > 0 && changedHexagram) {
            advice += `<br><br>Với hào động, ${changedHexagram.advice.toLowerCase()}`;
        }
        hexagramAdvice.innerHTML = `<p>${advice}</p>`;

        resultSection.classList.remove('hidden');
        coinTossSection.classList.add('hidden');

        // Scroll to result section
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
};

window.deleteSavedReading = function (index) {
    if (confirm('Bạn có chắc muốn xóa lần gieo quẻ này?')) {
        savedHexagrams.splice(index, 1);
        localStorage.setItem('savedHexagrams', JSON.stringify(savedHexagrams));
        displaySavedReadings();

        if (savedHexagrams.length === 0) {
            savedReadings.classList.add('hidden');
        }
    }
};

// Initialize saved readings display if any
if (savedHexagrams.length > 0) {
    displaySavedReadings();
    savedReadings.classList.remove('hidden');
}