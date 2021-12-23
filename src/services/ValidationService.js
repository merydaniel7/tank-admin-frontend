import { isEmail } from "validator";


const required = value => {
  if (!value) {
    return (
      <div className="relative w-full mb-3 mt-1">
      <div className="bg-red-500 text-white font-bold rounded px-2 text-sm" role="alert">
        Kötelező kitölteni!
      </div>
      </div>
    );
  }
};

const usernameLength = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="relative w-full mb-3 mt-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-2 text-sm" role="alert">
        A felhasználónév hossza: min. 3 és max. 20 karakter!
      </div>
      </div>
    );
  }
};

const emailLength = value => {
  if (value.length > 50) {
    return (
      <div className="relative w-full mb-3 mt-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-2 text-sm" role="alert">
        Az e-mail cím hossza:  max. 50 karakter!
      </div>
      </div>
    );
  }
};

const passwordLength = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="relative w-full mb-3 mt-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-2 text-sm" role="alert">
        A jelszó hossza: min. 6 és max. 40 karakter!
      </div>
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="relative w-full mb-3 mt-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-2 text-sm" role="alert">
        Nem valós e-mail cím!
      </div>
      </div>
    );
  }
};

export {required, usernameLength, emailLength, passwordLength, validEmail};