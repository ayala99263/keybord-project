import { useState } from "react";
import './screen-areas.css';

function SaveFile(props) {
    function saveFile(text, fileName) {
        const data_of_current_user = JSON.parse(localStorage.getItem(props.currentPhone));
        const updeted_data = data_of_current_user.filesArray.push({ name: fileName, data: text });
        localStorage.setItem(props.currentPhone, JSON.stringify(data_of_current_user));
        cleare_file_name_input_area();
        props.setShowSaveArea(false);
        
    }
    function cleare_file_name_input_area() {

        props.update_array_of_all_Screens(prevScreens => {
            const newScreens = [...prevScreens];
            newScreens[props.id] = {
                ...newScreens[props.id],
                content: [...newScreens[props.id].content]
            };
            newScreens[props.id].content[4] = {
                ...newScreens[props.id].content[1],
                text: []
            };
            return newScreens;
        });
    }
    return (
        <div className="save-area">
            <div className="text-area-wrapper">
                <div className="text-area-label">💾 שם הקובץ</div>
                <div
                    onClick={() => props.update_current_screen(props.id, "screen_name_to_save")}
                    className="text-area filename-text-area"
                    data-placeholder="שם הקובץ..."
                >
                    {props.changedText.map((letter, index) => (
                        <span key={index}>{letter.tav}</span>
                    ))}
                </div>
            </div>
            <button
                className="save-execute-btn"
                onClick={() => {
                    const fileName = props.changedText.map(item => item.tav).join("");
                    saveFile(props.screenText, fileName);
                }}
            >
                💾 שמור קובץ
            </button>
        </div>
    )

}

export default SaveFile;