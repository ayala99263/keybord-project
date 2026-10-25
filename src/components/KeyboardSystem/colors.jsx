import React from 'react';
import './ColorPickerMenu.css'; 

const ColorPickerMenu = ({ setSelectedColor }) => {

    const themeColors = [
        ["#1E4E79", "#385723", "#996500", "#7A3900", "#4F4F4F", "#2D2D2D", "#000000"],
        ["#4472C4", "#70AD47", "#FFC000", "#ED7D31", "#A5A5A5", "#5B5B5B", "#808080"],
        ["#A5C1E7", "#C6E0B4", "#FFE699", "#F8CBAE", "#EDEDED", "#C9C9C9", "#D9D9D9"],
        ["#D9E1F2", "#E2EFDA", "#FFF2CC", "#FCE4D6", "#F4F4F4", "#E6E6E6", "#F2F2F2"],
        ["#5B9BD5", "#7B9E66", "#BF8F00", "#D6581C", "#7F7F7F", "#404040", "#BFBFBF"]
    ];

    const standardColors = [
        "#800080", "#000080", "#0000FF", "#00FFFF", "#008000", "#808000", "#FFFF00", "#FFA500", "#FF0000"
    ];

    
    const handleCellClick = (colorCode) => {
               
        if (setSelectedColor) {
            setSelectedColor(colorCode);
        }
    };


    const ColorRow = ({ colors }) => (
        <tr>
            {colors.map((color, index) => (
                <td
                    key={index}
                    style={{ backgroundColor: color }}
                    onClick={() => handleCellClick(color)}
                    title={color} 
                ></td>
            ))}
        </tr>
    );

    return (
        <div id="color-picker-menu" dir="rtl">
            <h3 className="menu-title">בחירת צבע</h3>
            
            {/* צבעי ערכת נושא */}
            <p className="color-section-title">צבעי ערכת נושא</p>
            <table className="color-table">
                <tbody>
                    {themeColors.map((row, index) => (
                        <ColorRow key={index} colors={row} />
                    ))}
                </tbody>
            </table>
            
            {/* צבעים רגילים */}
            <p className="color-section-title">צבעים רגילים</p>
            <table className="color-table standard-colors-table">
                <tbody>
                    <ColorRow colors={standardColors} />
                </tbody>
            </table>
            

        </div>
    );
};

export default ColorPickerMenu;
