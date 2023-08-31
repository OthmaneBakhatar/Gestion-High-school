// import React, { useState } from "react";
// import axios from "axios";
// // import './Signup.css'

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
 
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:3002/admin/${username}/${password}`);
//       console.log(response.data); // true or false
//       if(response.data)
//       {
//         window.location.href='./Tab'
//       }
//       else
//       {
//         alert("Compte inexistant!!")
//         window.location.href='./Signin'
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="signin-container">
//       <form onSubmit={handleSubmit} >
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//         <a href="./Signin">Vous n'avez pas de Compte</a>
//       </form>
//     </div>
//   );
// }

// export default Signup;
