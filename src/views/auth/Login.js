import { React, useState, useRef, useContext } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';
import { UserContext } from '../../services/UserContext';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { required } from '../../services/ValidationService';


const Login = () => {
  const [username, setUserNameLocally] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);    
  const [isLoading, setIsLoading] = useState(false);
  const {setLoginOrLogoutTriggered, setUserName} = useContext(UserContext);
  const checkBtn = useRef()
  const form = useRef();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    sendUserCredentials();
    } else {
      setIsLoading(false);
    }
  }

  const sendUserCredentials = () => {
    axios
    .post('http://localhost:8080/api/auth/signin',
    {
      username,
      password
    })
    .then(res => {
      if(res.data.username) {
        cookie.save("Authorization", res.data.accessToken, { path: '/', maxAge: 259200  });
        cookie.save("username", res.data.username, { path: '/', maxAge: 259200  });
        setUserName(res.data.username);
        setLoginOrLogoutTriggered(true);                      
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
        setIsLoading(false);
      }
      },
      error => {
        const resMessage =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        
        setIsLoading(false);
        setMessage(resMessage);
    })
  }

    return (
      loginSuccess ? (<Redirect to="/admin"/>) :
      (<>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <br></br>
                  </div>
                  <Form
                    onSubmit={(e)=>handleLoginSubmit(e)}
                    ref={form}               
                  >
                    <div className="relative w-full mb-3">
                      <label htmlFor="username">Felhasználó név</label>
                      <Input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="username"
                        value={username}
                        placeholder="Felhasználó név"
                        onChange={(e) => setUserNameLocally(e.target.value)}
                        validations={[required]}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label htmlFor="password">Jelszó</label>
                      <Input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="password"
                        placeholder="Jelszó"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validations={[required]}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Bejelentkezés</span>
                      </button>
                    </div>

                    {message && (
                      <div className="relative w-full mb-3">
                        <div className="bg-red-500 text-white font-bold rounded-t px-2 py-2" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={checkBtn}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>)
    )
}

export default Login;