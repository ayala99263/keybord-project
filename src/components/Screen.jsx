import SaveFile from "./ScreenSystem/SaveFile"
import MainScreen from "./ScreenSystem/MainScreen"
import SearchArea from "./ScreenSystem/SearchArea";
import SwitchTav from "./ScreenSystem/SwitchTav";
import { useState } from "react"
import './screen.css';
function Screen(props) {
    const [showSearchArea, setShowSearchArea] = useState(false);
    const [showUpdateArea, setShowUpdateArea] = useState(false);
    const [showSaveArea, setShowSaveArea] = useState(false);
 
    if (!props.content || !props.content[0]) {
        return <div>Loading...</div>;
    }

    return (<>
        < MainScreen id={props.id} changedText={props.content[0].text} update_current_screen={props.update_current_screen} />


        {showSaveArea && <SaveFile
            id={props.id}
            changedText={props.content[4].text}
            update_current_screen={props.update_current_screen}
            screenText={props.content[0].text}
            update_array_of_all_Screens={props.update_array_of_all_Screens}
            updateScreenText={props.updateScreenText}
            setShowSaveArea={setShowSaveArea}
            currentPhone={props.currentPhone}
            

        />}
        {showSearchArea && <SearchArea
            id={props.id}
            changedText={props.content[1].text}
            update_current_screen={props.update_current_screen}
            screenText={props.content[0].text}
            update_array_of_all_Screens={props.update_array_of_all_Screens}
            updateScreenText={props.updateScreenText}
            setShowSearchArea={setShowSearchArea}

        />}
        {showUpdateArea && <SwitchTav
            id={props.id}
            tavToSaerch={props.content[2].text}
            tavToApdate={props.content[3].text}
            update_current_screen={props.update_current_screen}
            screenText={props.content[0].text}
            update_array_of_all_Screens={props.update_array_of_all_Screens}
            updateScreenText={props.updateScreenText}
            setShowUpdateArea={setShowUpdateArea}

        />}
        <div className="screen-actions">
            <button
                className={`action-btn save-btn ${showSaveArea ? 'active' : ''}`}
                onClick={() => { setShowSaveArea(!showSaveArea) }}
            >
                💾 שמירה
            </button>
            <button
                className={`action-btn search-btn ${showSearchArea ? 'active' : ''}`}
                onClick={() => { setShowSearchArea(!showSearchArea) }}
            >
                🔍 חיפוש
            </button>
            <button
                className={`action-btn update-btn ${showUpdateArea ? 'active' : ''}`}
                onClick={() => setShowUpdateArea(!showUpdateArea)}
            >
                🔄 עדכון
            </button>
        </div>

    </>)
    

}
export default Screen