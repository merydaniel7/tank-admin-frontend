import axios from "axios";
import authHeader from "./AuthHeader";


const API_URL = "http://localhost:8080/api/profit-on-products/";

  const getLegjobbMunkaruhaProfitOnProductsByMonth = (month) => {
    return axios.post(API_URL + "lm", {"month": month}, {
      headers: {
      'Authorization': "Bearer " + authHeader()
      }
    })
  }

export {getLegjobbMunkaruhaProfitOnProductsByMonth};