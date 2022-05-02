import { setCookies, getCookie, removeCookies } from "cookies-next";
import jwt from "jsonwebtoken";

class CommanFunctions {
    constructor() { }
    checkUserLoged() {
        var rtndata;
        var readCookie = getCookie("u_det");
        //console.log(readCookie);
        if (readCookie) {
            var userData = JSON.parse(readCookie);
            //console.log(userData.token)
            jwt.verify(userData.token, "jhsjkfhwkldgladgunlfvdghjygdgjdgjawgdagoasdn", (err, verifiedJwt) => {
                if (err) {
                  console.log(err.message);
                  rtndata = rtndata = {success : false} ;
                } else {
                  //console.log("ddx", verifiedJwt);
                 
                   rtndata = {success : true, email : verifiedJwt.id, username :userData.firstName} 
                }
              });
            
        } else {
             rtndata = rtndata = {success : false} ;
             
        }
        return  rtndata ;
        
    }
   
    logout() {
        removeCookies("u_det");
    }

   
}


module.exports = new CommanFunctions();