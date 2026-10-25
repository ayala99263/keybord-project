import './keyboard.css';

function Keyboard_delete_buttons({ updateCurrentScreenText, currentText, setaAtionsArr }) {

    function removeLastWord() {
        let lastSpaceIndex = currentText.length - 1;
        let lastWord = []
        while (lastSpaceIndex >= 0 && currentText[lastSpaceIndex].tav === " ") {
            lastWord = [...lastWord, currentText[lastSpaceIndex]]
            lastSpaceIndex--;
        }

        while (lastSpaceIndex >= 0 && currentText[lastSpaceIndex].tav !== " ") {
            lastWord = [currentText[lastSpaceIndex],...lastWord,]
            lastSpaceIndex--;
        }
        setaAtionsArr(actionsArr => [...actionsArr, { type: "delete", value: lastWord }])
        return lastWord.length;
    }

    function removeLastChar() {
        if (currentText.length) {
            const lastTav = currentText[currentText.length - 1]
            setaAtionsArr(actionsArr => [...actionsArr, { type: "delete", value: [lastTav] }])
        }
    }

    function removeAll() {
        const length_of_all_text = currentText.length;
        setaAtionsArr(actionsArr => [...actionsArr, { type: "delete", value: currentText }])
        return length_of_all_text;
    }

    return (
        <div className="delete-buttons-container">
            <button
                className="keyboard-key delete-key backspace-key"
                onClick={() => { removeLastChar(); updateCurrentScreenText("delete", 1) }}
                title="מחק תו אחרון"
            >
                ⌫ Backspace
            </button>

            <button
                className="keyboard-key delete-key word-delete-key"
                onClick={() => { const length_of_last_word = removeLastWord(); updateCurrentScreenText("delete", length_of_last_word) }}
                title="מחק מילה"
            >
                🗑️ Delete Word
            </button>

            <button
                className="keyboard-key delete-key clear-all-key"
                onClick={() => { const length_of_all_text = removeAll(); updateCurrentScreenText("delete", length_of_all_text) }}
                title="מחק הכל"
            >
                🗑️ Clear All
            </button>
        </div>
    )
}
export default Keyboard_delete_buttons;
