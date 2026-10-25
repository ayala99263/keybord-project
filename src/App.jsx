import { use, useState } from 'react'
import './App.css'
import ScreenManager from './components/ScreenManager'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [current_user_phone,set_current_user_phone]= useState(null)

  return (
    <div className="app-container text-management-app">
      <div className="fade-in">
        {isLoggedIn ? 
          <ScreenManager 
            current_user_phone={current_user_phone}
            onLogout={() => setIsLoggedIn(false)}
          /> : 
          <Login onLoginSuccess={() => setIsLoggedIn(true)} set_current_user_phone={set_current_user_phone}/>
        }
      </div>
    </div>
  )
}

export default App