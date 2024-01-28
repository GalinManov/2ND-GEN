import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export const useAuthContext = () => {

    const { user, dispatch } = useContext(AuthContext);

    return { user, dispatch };
};