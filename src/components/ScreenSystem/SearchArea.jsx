import './screen-areas.css';

function SearchArea(props) {
    let tavToSaerch = props.changedText.length > 0 ? props.changedText[props.changedText.length - 1].tav : "חפש תו..."

    function updateMainScreenDirectly(newText) {
        props.update_array_of_all_Screens(prevScreens => {
            const newScreens = [...prevScreens];
            newScreens[props.id] = {
                ...newScreens[props.id],
                content: [...newScreens[props.id].content]
            };
            newScreens[props.id].content[0] = {
                ...newScreens[props.id].content[0],
                text: newText
            };
            return newScreens;
        });
    }

    function clearSearchArea() {
        props.update_array_of_all_Screens(prevScreens => {
            const newScreens = [...prevScreens];
            newScreens[props.id] = {
                ...newScreens[props.id],
                content: [...newScreens[props.id].content]
            };
            newScreens[props.id].content[1] = {
                ...newScreens[props.id].content[1],
                text: []
            };
            return newScreens;
        });
    }

    function searchTav(tav) {
        if (props.screenText) {
            const updatedArr = props.screenText.map(item => {
                const newStyle = { ...item.style };
                if (newStyle.backgroundColor === "yellow") {
                    delete newStyle.backgroundColor;
                }
                if (item.tav === tav) {
                    newStyle.backgroundColor = "yellow";
                }
                return { ...item, style: newStyle };
            });
            
            updateMainScreenDirectly(updatedArr);
            setTimeout(() => {
                clearSearchArea();
            }, 1000);
            
            props.setShowSearchArea(false)
            setTimeout(() => {
                const clearedArr = updatedArr.map(item => {
                    const newStyle = { ...item.style };
                    if (newStyle.backgroundColor === "yellow") {
                        delete newStyle.backgroundColor;
                    }
                    return { ...item, style: newStyle };
                });
                updateMainScreenDirectly(clearedArr);
            }, 3000);
        }
    }

    return (
        <div className="search-area">
            <div className="text-area-wrapper">
                <div className="text-area-label">🔍 חיפוש תו</div>
                <div 
                    onClick={() => props.update_current_screen(props.id,"search")} 
                    className="text-area search-text-area"
                    data-placeholder="הכנס תו לחיפוש..."
                >
                    {tavToSaerch}
                </div>
            </div>
            <button 
                className="search-btn"
                onClick={() => {
                    if (props.changedText.length > 0) {
                        const lastChar = props.changedText[props.changedText.length - 1].tav;
                        searchTav(lastChar);
                    }
                }}
            >
                🔍 חפש
            </button>
        </div>
    )
   
}
export default SearchArea;