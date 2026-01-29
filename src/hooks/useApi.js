import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { clearToken } from "../redux/reducers/token";

export const useApi = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const authFetch = useCallback (async (URL, options = {}) => {
        const headers = {
            ...options.headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await fetch(URL, { ...options, headers });

            if (response.status === 401) {
                alert("Session expired. Logging out.");
                dispatch(setUser(null));
                dispatch(clearToken());
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return null;
            }
            return response;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    }, [token, dispatch]);
    
    return { authFetch, user, token };
};