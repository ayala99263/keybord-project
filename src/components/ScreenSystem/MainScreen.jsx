import { useState } from "react";
import './screen-areas.css';

function MainScreen( props) {

    let textArray = [...props.changedText];

    return (
        <div className="text-area-wrapper">
            <div className="text-area-label">📝 טקסט ראשי</div>
            <div 
                onClick={() => props.update_current_screen(props.id,"main_screen")} 
                className="text-area main-text-area"
                data-placeholder="לחץ כדי להתחיל לכתוב..."
            >
                {textArray.map((letter, index) => (
                    <span key={index} style={letter.style}>{letter.tav}</span>
                ))}
            </div>
        </div>
    )

}
export default MainScreen