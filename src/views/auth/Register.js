import { React, useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {required, usernameLength, emailLength, passwordLength, validEmail} from '../../services/ValidationService';


export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [message, setMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);    
  const [isLoading, setIsLoading] = useState(false);
  const checkBtn = useRef()
  const form = useRef();
  const passwordIsMatching = useRef();   


  const mathcingPassword = () => {
    if(!passwordIsMatching.current) {
      return (
        <div className="relative w-full mb-3">
          <div className="bg-red-500 text-white font-bold rounded-t px-2 py-2" role="alert">
            Nem egyezik a jelszó!
          </div>
        </div>
      );
    }
  }


  useEffect(() => {
    if (password === passwordAgain) {
        passwordIsMatching.current = true
      } else {
        passwordIsMatching.current = false
      }
  }, [password, passwordAgain])


  const handleRegisterSubmit = (e) => {
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
    .post('http://localhost:8080/api/auth/signup',
    {
      username,
      email,
      password
    })
    .then(res => {
      if(res.status === 200) {
        alert(res.data.message);     
        setRegisterSuccess(true);
      } else {
        setRegisterSuccess(false);
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
    registerSuccess ? (<Redirect to="/auth/login"/>) :
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
                  onSubmit={(e)=>handleRegisterSubmit(e)}
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
                      onChange={(e) => setUserName(e.target.value)}
                      validations={[required, usernameLength]}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label htmlFor="username">E-mail</label>
                    <Input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="username"
                      value={email}
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      validations={[required, validEmail, emailLength]}
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
                      validations={[required, passwordLength]}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label htmlFor="password">Jelszó újra</label>
                    <Input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="password-again"
                      placeholder="Jelszó újra"
                      value={passwordAgain}
                      onChange={(e) => setPasswordAgain(e.target.value)}
                      validations={[required, mathcingPassword]}
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
                      <span>Regisztráció</span>
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
                <br></br>
                <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Elfogadom a {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Felhasználói feltételeket
                        </a>
                      </span>
                    </label>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
  )
}
