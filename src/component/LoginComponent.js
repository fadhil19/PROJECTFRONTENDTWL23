import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import './LoginComponent.css';

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('https://fair-jade-cormorant-cape.cyclic.app/login', {
            username,
            password,
          });
    
          const token = response.data.token
          // Handle the response from the backend, e.g., store tokens in local storage
          console.log(response);
          localStorage.setItem('token', token)
    
          // Reset form fields
          setUsername('');
          setPassword('');
          setIsValid(true)
          navigate('/daftarmhs')
        } catch (error) {
          // Handle error cases, e.g., display error messages
          setIsValid(false)
          console.error(error);
        }
      };
  
      return (
        <div className="container">
          {!isValid && <p className="error-login">Username tidak ditemukan!</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <h2>Login Page</h2>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button type="submit" onClick={() => navigate('/daftarmhs')}>Login</button>
                <button type="button" onClick={() => navigate('/register')}>Register</button>
              </div>
            </div>
          </form>
        </div>
      );      
}


export default LoginComponent