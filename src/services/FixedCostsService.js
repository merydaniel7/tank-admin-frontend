import axios from "axios";
import authHeader from "./AuthHeader";


const API_URL = "http://localhost:8080/api/fixed-costs/";

  const getFixedCostsByMonth = (month) => {
    return axios.post(API_URL + "tank", {"month": month}, {
      headers: {
      'Authorization': "Bearer " + authHeader()
      }
    })
  }

  const saveFixedCosts = (fixedCosts) => {
    return axios.post(API_URL + "tank/save", {fixedCosts}, {
      headers: {
      'Authorization': "Bearer " + authHeader()
      }
    })
  }

export {getFixedCostsByMonth, saveFixedCosts};