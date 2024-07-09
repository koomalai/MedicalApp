import { HttpResponse, http } from "msw";
import { userRegisterUrl } from "../../../services/Hooks/User/UseUserRegister";
import { expect } from "vitest";

export const registerHandler =
    http.post(userRegisterUrl, async({request}) => {
        /* debugger
        console.log("Entering mock API");
        let data = await request.json();
        console.log(data);
        if(JSON.stringify(data) === JSON.stringify(payload)){
            console.log(data);
            return HttpResponse.json(false, {status: 500, headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}});
        } */
        debugger
    
        return HttpResponse.json(true, {headers: { "Content-Type":"application/json", "Accept":"application/json", "Access-Cross-Allow-Origin":"*"}});
    })