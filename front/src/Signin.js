// // import './Signin.css';
// // import './login.css';
// import React, { useState , useEffect } from 'react';
// import axios from 'axios';


// function Signin() {
//   const [show, setShow] = useState(false);
  

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [_id, set_Id] = useState()
//   const [username,setUsername] = useState()

//   const [password,setPassword] = useState()

//   const [user, setUser] = useState({
//     username:"",
//     password:"",
//   });

//   function handle(e) {
//     const { name, value } = e.target;
//     setUser(prevState => ({ ...prevState, [name]: value }));
//     console.log(user);
//   }

//   const submitUser = async (e) => {
//     e.preventDefault();
//     setShow(false);
//     await axios.post('http://localhost:3002/admin/',{    
//       username:user?.username,
//       password:user?.password
//     })
//     .then((result) => {
//       console.log(result.user);
//       alert(`well registred`);
//       window.location.href='./Signup'
//     });
//   };

//   return (
//     <html>
//       <head>
//         <link rel="stylesheet" href="login.css" type="text/css" />
//       </head>

//       <div className="signin-container">
//         <form className="signin-form" >
//           <label className="signin-label">Username:</label>
//           <input
//             type="text"
//             required
//             placeholder="Enter your username"
//             value={user?.username} onChange={(e)=>handle(e)}
//             name="username"
//             className="signin-input"
//           />
//           <label className="signin-label">Password:</label>
//           <input
//             type="password"
//             required
//             placeholder="Enter your password"
//             value={user?.password} onChange={(e)=>handle(e)}
//             name="password"
//             className="signin-input"
//           />
//           <button type="submit" className="signin-button" onClick={submitUser}>Sign in</button>
//         </form>
//       </div>
//     </html>
//   );
// };

// export default Signin;