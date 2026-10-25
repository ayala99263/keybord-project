import '../ScreenSystem/screen-areas.css';

function SwitchTav(props) {
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

    function clearSearchAndUpdateAreas() {
        props.update_array_of_all_Screens(prevScreens => {
            const newScreens = [...prevScreens];
            newScreens[props.id] = {
                ...newScreens[props.id],
                content: [...newScreens[props.id].content]
            };
            newScreens[props.id].content[2] = {
                ...newScreens[props.id].content[2],
                text: []
            };
            newScreens[props.id].content[3] = {
                ...newScreens[props.id].content[3],
                text: []
            };
            return newScreens;
        });
    }

    function updateTav(theTavToSaerch, theTavToUpdate) {
        if (props.screenText) {
            const updatedArr = props.screenText.map(item => {
                if (item.tav === theTavToSaerch) {
                    return { ...item, tav: theTavToUpdate };
                }
                return item;
            });
            updateMainScreenDirectly(updatedArr)
            setTimeout(() => (clearSearchAndUpdateAreas()), 1000);


        }
        props.setShowUpdateArea(false);
    }

    let tavSaerch = props.tavToSaerch && props.tavToSaerch.length > 0 ? props.tavToSaerch[props.tavToSaerch.length - 1].tav : "tav to search";
    let tavUpdate = props.tavToApdate && props.tavToApdate.length > 0 ? props.tavToApdate[props.tavToApdate.length - 1].tav : "tav to apdate"
    return (
        <div className="update-area">
            <div className="text-area-label">🔄 החלפת תווים</div>
            <div className="update-inputs">
                <div className="text-area-wrapper">
                    <div className="text-area-sublabel">מחפש:</div>
                    <div 
                        onClick={() => props.update_current_screen(props.id, "update_tav_to_search")} 
                        className="text-area replace-text-area"
                        data-placeholder="תו לחיפוש..."
                    >
                        {tavSaerch}
                    </div>
                </div>
                <div className="arrow">→</div>
                <div className="text-area-wrapper">
                    <div className="text-area-sublabel">מחליף ב:</div>
                    <div 
                        onClick={() => props.update_current_screen(props.id, "update_tav_to_replace")} 
                        className="text-area replace-text-area"
                        data-placeholder="תו להחלפה..."
                    >
                        {tavUpdate}
                    </div>
                </div>
            </div>
            <button 
                className="update-execute-btn"
                onClick={() => {
                    if (props.tavToSaerch && props.tavToSaerch.length > 0 && props.tavToApdate && props.tavToApdate.length > 0) {
                        const theTavToSaerch = props.tavToSaerch[props.tavToSaerch.length - 1].tav;
                        const theTavToUpdate = props.tavToApdate[props.tavToApdate.length - 1].tav;
                        updateTav(theTavToSaerch, theTavToUpdate);
                    }
                }}
            >
                🔄 בצע החלפה
            </button>
        </div>
    )


}
export default SwitchTav;