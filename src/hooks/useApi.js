import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/user";
import { clearToken, setToken } from "../redux/reducers/token";

export const useApi = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const login = useCallback(
        (userData, tokenData) => {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", tokenData);

            dispatch(setUser(userData));
            dispatch(setToken(tokenData));
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        dispatch(setUser(null));
        dispatch(clearToken());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }, [dispatch]);

    const authFetch = useCallback(
        async (URL, options = {}) => {
            const headers = {
                ...options.headers,
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await fetch(URL, { ...options, headers });

                if (response.status === 401) {
                    alert("Session expired. Logging out.");
                    logout();
                    return null;
                }

                return response;
            } catch (error) {
                console.error("Fetch error:", error);
                throw error;
            }
        },
        [token, logout]
    );

    return { authFetch, user, token, logout, login };
};
