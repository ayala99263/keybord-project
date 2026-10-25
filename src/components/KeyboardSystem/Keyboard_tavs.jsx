import { useState } from "react";
import './keyboard.css';

function Keyboard_tavs({ updateCurrentScreenText, style, setaAtionsArr, actionsTakenArr }) {
    const hebrewRows = [
        ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "]", "["],
        ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", ","],
        ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."]
    ];
    const englishRowsUpper = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
        ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
    ];
    const englishRowsLower = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
        ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
    ];
    const emojiRows = [
        ["😊", "😂", "😍", "😢", "😎", "🥳", "🙌", "🤔", "👍", "👎", "🔥", "✨"],
        ["🎉", "🎈", "🎂", "❤️", "💔", "😏", "🤷", "✌️", "🤫", "😱", "😴"],
        ["🐶", "🐱", "🦁", "🐯", "🦒", "🐻", "🐨", "🐼", "🌹"]
    ];
    const numbersRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const symbolsRow = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "="];

    const [language, setLanguage] = useState("Hebrew");
    const [isCapsLock, setIsCapsLock] = useState(false);
    const languages = ["Hebrew", "English", "Emojies"];

    let currentRows;
    if (language === "English") {
        currentRows = isCapsLock ? englishRowsUpper : englishRowsLower;
    } else if (language === "Hebrew") {
        currentRows = hebrewRows;
    } else {
        currentRows = emojiRows;
    }

    const toggleCapsLock = () => {
        setIsCapsLock(!isCapsLock);
    }

    const currentStyle = style;


    function undo() {
        if (actionsTakenArr.length === 0) return;

        let lastAction = actionsTakenArr[actionsTakenArr.length - 1]
        if (lastAction.type === "add") {
            updateCurrentScreenText("delete", 1)
        }
        else if (lastAction.type === "delete") {
            if (lastAction.value) {
                updateCurrentScreenText("add_deleted_text", [...lastAction.value])
            }
        }
        setaAtionsArr(actionsTakenArr => actionsTakenArr.slice(0, -1))
    }

    return (
        <div className={`keyboard-container ${language.toLowerCase()}-mode`}>
            <div className="control-section">
                <button
                    className="language-button"
                    onClick={() => setLanguage(languages[(languages.indexOf(language) + 1) % languages.length])}>
                    🌐 {language}
                </button>
                <button
                    className={`caps-lock-key ${isCapsLock ? 'active' : ''}`}
                    onClick={() => toggleCapsLock()}
                >
                    ⇪ CAPS {isCapsLock ? "ON" : "OFF"}
                </button>
                <button
                    className="control-button undo-key"
                    onClick={() => { undo() }}
                    title="ביטול פעולה אחרונה"
                >
                    ↶ Undo
                </button>
            </div>

            <div className="numbers-row">
                {numbersRow.map((number, index) => (
                    <button
                        key={index}
                        className="keyboard-key"
                        onClick={() => {
                            updateCurrentScreenText('add', { tav: number, style: { ...currentStyle } })
                            setaAtionsArr(actionsTakenArr => [...actionsTakenArr, { type: "add", value: null }])
                        }}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className="symbols-row">
                {symbolsRow.map((symbol, index) => (
                    <button
                        key={index}
                        className="keyboard-key"
                        onClick={() => {
                            updateCurrentScreenText('add', { tav: symbol, style: { ...currentStyle } })
                            setaAtionsArr(actionsTakenArr => [...actionsTakenArr, { type: "add", value: null }])
                        }}
                    >
                        {symbol}
                    </button>
                ))}
            </div>

            {currentRows.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row letters-row">
                    {row.map((letter, letterIndex) => (
                        <button
                            key={letterIndex}
                            className={`keyboard-key ${language === 'Hebrew' ? 'hebrew-key' :
                                    language === 'Emojies' ? 'emoji-key' : ''
                                }`}
                            onClick={() => {
                                updateCurrentScreenText('add', { tav: letter, style: { ...currentStyle } })
                                setaAtionsArr(actionsTakenArr => [...actionsTakenArr, { type: "add", value: null }])
                            }}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))}

            <div className="action-row">
                <button
                    className="keyboard-key space-key"
                    onClick={() => {
                        updateCurrentScreenText('add', { tav: " ", style: {} })
                        setaAtionsArr(actionsArr => [...actionsArr, { type: "add", value: null }])
                    }}
                    title="רווח"
                >
                    ⎵ Space
                </button>

                <button
                    className="keyboard-key enter-key"
                    onClick={() => {
                        updateCurrentScreenText('add', { tav: <br></br>, style: {} })
                        setaAtionsArr(actionsArr => [...actionsArr, { type: "add", value: null }])
                    }}
                    title="שורה חדשה"
                >
                    ↵ Enter
                </button>
            </div>
        </div>
    );
}
export default Keyboard_tavs;