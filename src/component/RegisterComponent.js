import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css';


export default function RegisterComponent() {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNimChange = (e) => {
    setNim(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    const userData = {
      name,
      nim,
      birthdate,
      address,
      username,
      password,
    };
    try {
      const response = await axios.post('https://fair-jade-cormorant-cape.cyclic.app/register', userData);
      setName('');
      setNim('');
      setBirthdate('');
      setAddress('');
      setUsername('');
      setPassword('');
      if (response.status === 200) {
        navigate('/login')
      }
    } catch (e) {
      console.error(e)
    }

  };

  return (
    <div>
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="nim">NIM:</label>
          <input
            type="text"
            id="nim"
            value={nim}
            onChange={handleNimChange}
          />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={handleBirthdateChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={handleAddressChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// export default RegisterComponent;
// In this code, each form field has its
//   let fields = ['name', 'nim', 'birthdate', 'address', 'username', 'password']
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  
//     const handleUsernameChange = (e) => {
//       setUsername(e.target.value);
//     };
  
//     const handlePasswordChange = (e) => {
//       setPassword(e.target.value);
//     };
  
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//           const response = await axios.post('https://fair-jade-cormorant-cape.cyclic.app/register', {
//             username,
//             password,
//           });
    
//           // Handle the response from the backend, e.g., store tokens in local storage
//           console.log(response.data);
    
//           // Reset form fields
//           setUsername('');
//           setPassword('');
//         } catch (error) {
//           // Handle error cases, e.g., display error messages
//           console.error(error);
//         }
//       };
  
//     return (
//         <>
//         <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//         </>
//     )
// }