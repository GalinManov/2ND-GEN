import { useCookies } from "react-cookie"

export const useCookieAuth = () => {
    const [cookies, _] = useCookies("access_token");
    

    return {headers: {authorization: cookies}};

};

