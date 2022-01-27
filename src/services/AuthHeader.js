import cookie from 'react-cookies';

export default function authHeader() {
  const token = cookie.load("Authorization");

  if (token) {
    return token;
  } else {
    return {};
  }
}