import { Get, Post } from "../axios";
let BASE_URL_JOBSEEKER = "jobseeker";
const JobSeekerConfigAPI = {
  createJobSeeker: async (payload) => {
    try {
      const res = await Post(`${BASE_URL_JOBSEEKER}/`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  loginJobSeeker: async (payload) => {
    try {
      const res = await Get(`${BASE_URL_JOBSEEKER}/login?email=${payload.email}&password=${payload.password}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default JobSeekerConfigAPI;
