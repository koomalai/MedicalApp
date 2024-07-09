import axios from "axios";
import { useMutation } from "react-query";
import { UserRegister } from "../../../pages/User/Types/UserRegister";

export const userRegisterUrl= 'https://localhost:7241/api/user/register';
const register = async (values: UserRegister): Promise<boolean> => {
  /* const data = JSON.stringify(
    {
      "Firstname": values.Firstname,
      "Lastname": values.Lastname,
      "Email": values?.Email,
      "Password": values?.Password,
      "ConfirmPassword": values.ConfirmPassword
    }
  );
  const response = await fetch(userRegisterUrl, {
    method: 'POST',
    body: data,
    headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}
  });
  console.log("response api: ");
  return response.status===204? null: response.json(); */
  const { data } = await axios.post(userRegisterUrl, values);
  return data;
};

export function useRegister() {
  const { isLoading, mutateAsync } = useMutation(register);
  return { isRegistering: isLoading, register: mutateAsync };
}
