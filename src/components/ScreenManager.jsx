import { useState } from 'react'
import Screen from './Screen'
import Keyboard from './Keyboard'
import AddFile from './AddFile'
import './screenManager.css';
function ScreenManager({ current_user_phone, onLogout }) {
  const [array_of_all_Screens, update_array_of_all_Screens] = useState([])
  const [currentScreen, setCurrentScreen] = useState()
  const [currentScreenId, setCurrentScreenId] = useState(null)
  const [currentAreaIndex, setCurrentAreaIndex] = useState(null)
 
  function add_new_Screen(name = "מסמך ללא שם", text = []) {
    const new_Screen = {
      id: array_of_all_Screens.length, name: name, content: [
        { name: "main_screen", text: text },
        { name: "search", text: [] },
        { name: "update_tav_to_search", text: [] },
        { name: "update_tav_to_replace", text: [] },
        { name: "screen_name_to_save", text: [] }]
    }
    update_array_of_all_Screens([...array_of_all_Screens, new_Screen])
  }
  function update_current_screen(id, name) {
    if (!array_of_all_Screens[id]) {
      console.error(`מסך עם ID ${id} לא קיים`);
      return;
    }

    let place_in_content;
    switch (name) {
      case "main_screen":
        place_in_content = 0;
        break;
      case "search":
        place_in_content = 1;
        break;
      case "update_tav_to_search":
        place_in_content = 2;
        break;
      case "update_tav_to_replace":
        place_in_content = 3;
        break;
      case "screen_name_to_save":
        place_in_content = 4;
        break;
      default:
        console.error(`שם אזור לא מוכר: ${name}`);
        return;
    }

    setCurrentScreenId(id);
    setCurrentAreaIndex(place_in_content);
    setCurrentScreen(array_of_all_Screens[id].content[place_in_content].text);
  }

  function updateScreenText(newText) {
    if (currentScreenId !== null && currentAreaIndex !== null) {
      update_array_of_all_Screens(prevScreens => {
        const newScreens = [...prevScreens];
        newScreens[currentScreenId] = {
          ...newScreens[currentScreenId],
          content: [...newScreens[currentScreenId].content]
        };
        newScreens[currentScreenId].content[currentAreaIndex] = {
          ...newScreens[currentScreenId].content[currentAreaIndex],
          text: newText
        };
        return newScreens;
      });
      setCurrentScreen(newText);
    }
  }

  const [showFileList, setShowFileList] = useState(false);
  const currentPhone = current_user_phone;
  console.log("Current user phone in ScreenManager:", currentPhone);
  return (
    <div className="screen-manager-container">
    
      <div className="screen-manager-header glass">
        <h1 className="app-title">📝 מנהל טקסטים</h1>
        <div className="header-controls">
          <button
            className="modern-btn import-btn btn-hover-effect"
            onClick={() => setShowFileList(!showFileList)}
          >
            📁 ייבא קובץ
          </button>
          <button
            className="modern-btn add-btn btn-hover-effect"
            onClick={() => add_new_Screen()}
          >
            ➕ מסמך חדש
          </button>
          <button
            className="modern-btn logout-btn btn-hover-effect"
            onClick={onLogout}
          >
            🚪 התנתק
          </button>
        </div>
      </div>

      {showFileList && (
        <div className="import-section slide-in">
          <AddFile phoneNumber={currentPhone} add_file={add_new_Screen} />
        </div>
      )}

      
      <div className="screens-section">
        {array_of_all_Screens.length === 0 ? (
          <div className="no-screens-message glass">
            <h3>📄 אין מסמכים</h3>
            <p>התחל על ידי יצירת מסמך חדש או ייבוא קובץ</p>
          </div>
        ) : (
          <div className="screens-grid">
            {array_of_all_Screens.map((screen) => (
               <div key={screen.id} className="screen-wrapper fade-in">
                <Screen
                  id={screen.id}
                  content={screen.content}
                  update_current_screen={update_current_screen}
                  updateScreenText={updateScreenText}
                  update_array_of_all_Screens={update_array_of_all_Screens}
                  currentPhone={currentPhone}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="keyboard-section">
        <Keyboard currentScreen={currentScreen} updateScreenText={updateScreenText} />
      </div>
    </div>
  )

}

export default ScreenManager;