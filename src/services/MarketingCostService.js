import axios from "axios";
import authHeader from "./AuthHeader";


const API_URL = "http://localhost:8080/api/marketing-cost/";

  const getLegjobbMunkaruhaMarketingCostByMonth = (month) => {
    return axios.post(API_URL + "lm", {"month": month}, {
      headers: {
      'Authorization': "Bearer " + authHeader()
      }
    })
  }

  const getMonths = () => {
    return axios.get(API_URL + "months", {
      headers: {
      'Authorization': "Bearer " + authHeader()
      }
    })
  }

export {getLegjobbMunkaruhaMarketingCostByMonth, getMonths};