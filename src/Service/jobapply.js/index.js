import { Get, Post } from "../axios";
let BASE_URL_Apply= "apply";
const JobApplyConfigAPI = {
  createApply: async (payload) => {
    try {
      const res = await Post(`${BASE_URL_Apply}/`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default JobApplyConfigAPI;
