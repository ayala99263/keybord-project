import { useState } from 'react'
import './login.css'

function Login({ onLoginSuccess,set_current_user_phone }) {
    const [showPassword, setShowPassword] = useState(false)

    function handleLogin(e) {
        e.preventDefault();
        const phonNumber = document.getElementById("phonNumber").value;
        const password = document.getElementById("Password").value;

        const user = localStorage.getItem(phonNumber)
        if (user) {
            const userData = JSON.parse(user)
            if (userData.password === password) {
 
                set_current_user_phone(phonNumber)
                onLoginSuccess()
            } else {
                alert("Incorrect password")
            }
        } else {
            alert("User not found")
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        const phonNumber = document.getElementById("phonNumber").value;
        const userName = document.getElementById("userName").value;
        const password = document.getElementById("Password").value;

        const user = localStorage.getItem(phonNumber)
        if (user) {
            alert("User already exists")
        } else {
            const userData = { userName, password, "filesArray":[] }
            localStorage.setItem(phonNumber, JSON.stringify(userData))
        
            set_current_user_phone(phonNumber)
            onLoginSuccess()
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">📝 מנהל טקסטים</h1>
                    <p className="login-subtitle">התחבר או הירשם להתחיל</p>
                </div>
                
                <form className="login-form">
                    <div className="input-group">
                        <label className="input-label">📱 מספר טלפון</label>
                        <input 
                            id="phonNumber" 
                            type="text" 
                            className="login-input"
                            placeholder="הכנס מספר טלפון" 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">👤 שם משתמש</label>
                        <input 
                            id="userName" 
                            type="text" 
                            className="login-input"
                            placeholder="הכנס שם משתמש" 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">🔒 סיסמה</label>
                        <div className="password-input-wrapper">
                            <input 
                                id="Password" 
                                type={showPassword ? "text" : "password"} 
                                className="login-input password-input"
                                placeholder="הכנס סיסמה" 
                                required 
                            />
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    
                    <div className="button-group">
                        <button 
                            type="button" 
                            className="login-btn login-primary"
                            onClick={handleLogin}
                        >
                            🚪 התחבר
                        </button>
                        <button 
                            type="button" 
                            className="login-btn login-secondary"
                            onClick={handleSignup}
                        >
                            ➕ הירשם
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    }
    export default Login;