import axios from "axios";
import { useMutation } from "react-query";
import { UserLogin } from "../../../pages/User/Types/UserLogin";
import { json } from "react-router-dom";

export const userLoginUrl= 'https://localhost:7241/api/user/login';
const login = async (values: UserLogin): Promise<UserLogin | null> => {
  const data = JSON.stringify(
    {
      "Email": values?.Email,
      "Password": values?.Password
    }
  );
  const response = await fetch(userLoginUrl, {
    method: 'POST',
    body: data,
    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}
  });
  
 /*  if(response.status === 204){
    console.log("Status 204");
    return null;
  } */
  /* else{ */
  console.log("response api: ");
  return response.status===204? null: response.json();
  //}

  //console.log('response: ',response)

 /*  const { data } = await axios.post(userLoginUrl, values);
  console.log(data);
  return data; */
};

export function useLogin() {
  const { isLoading, mutateAsync } = useMutation(login);
  return { isLoggingIn: isLoading, login: mutateAsync };
}
