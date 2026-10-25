
import React, { useState } from 'react';
import ColorPickerMenu from './colors';
import './styleManager.css';

function Keyboard_style_manager({ setStyle, newstyle, updateCurrentScreenText }) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentStyle, setCurrentStyle] = useState({
        fontWeight: 'normal',
        textDecoration: 'none',
        fontStyle: 'normal'
    });
    const [designAllText, setDesignAllText] = useState(false)

    const updateAllTextStyle = (updatedStyle) => {
        if (designAllText) {
       
            updateCurrentScreenText("style_all",updatedStyle);
        }
    };

    const handleStyleChange = (property, value) => {
        const newValue = currentStyle[property] === value ? 'normal' : value;
        setCurrentStyle(prev => ({ ...prev, [property]: newValue }));
        setStyle(prevStyle => {
            const updatedStyle = { ...prevStyle, [property]: newValue };
            updateAllTextStyle(updatedStyle);
            return updatedStyle;
        });
    };

    function handleDesignAllText() {
        setDesignAllText(!designAllText);
     
    }

    return (
        <div className="style-manager">
            <div className="style-manager-header">
                <h3>🎨 עיצוב טקסט</h3>
                <button
                    className={`style-toggle-btn ${designAllText ? 'active' : ''}`}
                    onClick={() => handleDesignAllText()}
                >
                    ✨ עצב הכל
                </button>
            </div>


            <div className="style-sections-grid">
                {/* צבע */}
                <div className="style-section color-section">
                    <div className="style-section-title">🎨 צבע</div>
                    <button
                        className="modern-button color-button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                        בחר צבע
                    </button>
                    {showColorPicker && (
                        <div className="color-picker-overlay">
                            <ColorPickerMenu
                                setSelectedColor={(color) => {
                                    setStyle(prevStyle => {
                                        const updatedStyle = { ...prevStyle, color: color };
                                        updateAllTextStyle(updatedStyle);
                                        return updatedStyle;
                                    });
                                    setShowColorPicker(false);
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className="style-section font-section">
                    <div className="style-section-title">🔤 גופן</div>
                    <select
                        className="modern-select font-select"
                        onChange={(e) => {
                            setStyle(prevStyle => {
                                const updatedStyle = { ...prevStyle, fontFamily: e.target.value };
                                updateAllTextStyle(updatedStyle);
                                return updatedStyle;
                            });
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>בחר גופן</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Georgia">Georgia</option>
                    </select>
                </div>

                <div className="style-section size-section">
                    <div className="style-section-title">📎 גודל</div>
                    <div className="size-buttons">
                        <button
                            className="modern-button size-btn decrease"
                            onClick={() => {
                                setStyle(prevStyle => {
                                    const updatedStyle = { ...prevStyle, fontSize: parseInt(prevStyle.fontSize) - 4 + "px" };
                                    updateAllTextStyle(updatedStyle);
                                    return updatedStyle;
                                });
                            }}
                            title="הקטן גופן"
                        >
                            A−
                        </button>
                        <button
                            className="modern-button size-btn increase"
                            onClick={() => {
                                setStyle(prevStyle => {
                                    const updatedStyle = { ...prevStyle, fontSize: parseInt(prevStyle.fontSize) + 4 + "px" };
                                    updateAllTextStyle(updatedStyle);
                                    return updatedStyle;
                                });
                            }}
                            title="הגדל גופן"
                        >
                            A+
                        </button>
                    </div>
                </div>

                <div className="style-section format-section">
                    <div className="style-section-title">✨ עיצוב</div>
                    <div className="style-buttons">
                        <button
                            className={`modern-button style-btn bold-btn ${currentStyle.fontWeight === 'bold' ? 'active' : ''}`}
                            onClick={() => handleStyleChange('fontWeight', 'bold')}
                            title="מודגש"
                        >
                            B
                        </button>
                        <button
                            className={`modern-button style-btn underline-btn ${currentStyle.textDecoration === 'underline' ? 'active' : ''}`}
                            onClick={() => handleStyleChange('textDecoration', 'underline')}
                            title="קו תחתון"
                        >
                            𝘐̲
                        </button>
                        <button
                            className={`modern-button style-btn italic-btn ${currentStyle.fontStyle === 'italic' ? 'active' : ''}`}
                            onClick={() => handleStyleChange('fontStyle', 'italic')}
                            title="נטוי"
                        >
                            𝐼
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Keyboard_style_manager;    
