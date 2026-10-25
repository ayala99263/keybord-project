import Keyboard_delete_buttons from "./KeyboardSystem/Keyboard_delete_buttons";
import Keyboard_tavs from "./KeyboardSystem/Keyboard_tavs";
import { useState } from "react";
import Keyboard_style_manager from "./KeyboardSystem/Keyboard_style_manager";
import './keyboard-main.css';
function keyboard({ currentScreen, updateScreenText }) {
    const [style, setStyle] = useState({
        color: "black",
        fontSize: "16px",
        fontFamily: "Arial",
        fontStyle: "normal",
        textDecoration: "none",
        fontWeight: "normal",
        backgroundColor: "none"

    })

    function updateCurrentScreenText(action, data) {
        if (!currentScreen) return;

        const currentText = currentScreen;
        let newText;

        switch (action) {
            case 'add':
                newText = [...currentText, data];
                break;
            case 'add_deleted_text':
                newText = [...currentText, ...data];
                break;
            case 'delete':
                newText = currentText.slice(0, -(data || 1));
                break;
            case 'replace':
                newText = data;
                break;
            case 'style_all':
                newText = currentText.map(letter => ({
                    ...letter,
                    style: data
                }));
                break;
            default:
                newText = currentText;
        }

        updateScreenText(newText);
    }
    const [actionsTakenArr, setaAtionsArr] = useState([])

    return (
        <div className="main-keyboard-container">
            <div className="keyboard-main">
                <div className="keyboard-controls">
                    <Keyboard_delete_buttons updateCurrentScreenText={updateCurrentScreenText} currentText={currentScreen} setaAtionsArr={setaAtionsArr} />
                </div>
                <Keyboard_tavs updateCurrentScreenText={updateCurrentScreenText} style={style} setaAtionsArr={setaAtionsArr} actionsTakenArr={actionsTakenArr} />
            </div>
            <div className="keyboard-side-panel">
                <Keyboard_style_manager setStyle={setStyle} newstyle={style} updateCurrentScreenText={updateCurrentScreenText} />
            </div>
        </div>
    )
}
export default keyboard;