import { Get, Post } from "../axios";
let BASE_URL_Opening= "opening";
const JobOpeningConfigAPI = {

  getOpenings: async (payload) => {
    try {
      const res = await Get(`${BASE_URL_Opening}/seeker`,);
      return res;
    } catch (error) {
      throw error;
    }
  },

//   loginEmployer: async (payload) => {
//     try {
//       const res = await Get(`${BASE_URL_Opening}/login?email=${payload.business_email}&password=${payload.password}`);
//       return res;
//     } catch (error) {
//       throw error;
//     }
//   },
};

export default JobOpeningConfigAPI;
