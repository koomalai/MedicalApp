import { http, HttpResponse } from 'msw'
import { UserLogin } from '../../../pages/User/Types/UserLogin';
import { userLoginUrl } from '../../../services/Hooks/User/UseUserLogin';
import { Email, Password } from '@mui/icons-material';
import { server } from '../../server';

/* const data = JSON.stringify(
  {
    "Email": 'kalaivani@gmail.com',
    "Password": 'Kal1304*'
  }
); */
//let dataDetails :UserLogin;
export const loginHandler =
  http.post(userLoginUrl, async({request}) => {
    debugger
      let dataRequired = (
        {
          Email: 'kalaivani@gmail.com',
          Password: 'Kal1304*'
        }
      );
      let data = await request.json();
      console.log("start data: ", data);
      
      console.log("String data", dataRequired);
      //const password = data.get('Password')
      //console.log("Status",{status: 200});
      if(JSON.stringify(data) === JSON.stringify(dataRequired)){
        console.log("data", data)
        return HttpResponse.json(
          //response.json()
          {
            userId: 1,
            firstName: "Kalaivani",
            lastName: "Chandra",
            email: "kalaivani@gmail.com",
            password: "$2a$10$KaWqRbUF0jEX0vnxE41U0OOzD8vPoD/pFQDDS0/fzksugAmx7wr1y",
            userType: "User",
            status: 1,
            createdOn: "2024-11-03T00:00:00",
            carts: [],
            orders: []
          },
          { status: 200,headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}  }
        )
      }
  })

