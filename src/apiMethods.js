/*
  Goto https://reqres.in/ for documentation on this api.
  
  If you haven't used axios, documentation here: https://github.com/axios/axios
  OR use any method / library you're comfortable with to perform the request(s).

  **** These stubs are just provided as a convienece, ****
  **** feel free to change whatever you like to accomplish the goal. ****
*/

import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = 'https://reqres.in';

const getUsersApi = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/users`);
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
export default function useGetUsers() {
  return useQuery(['users'], () => getUsersApi());
}
// Bonus:
export const deleteUser = () => {};
