import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
    const [isTokenValid, setIsTokenValid] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const userToken = localStorage.getItem("userToken");

            if (!userToken) {
                setIsTokenValid(false);
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:3000/api/checkToken",
                    { token: userToken }
                );
                console.log(response.data);
                setIsTokenValid(true);
                localStorage.setItem("userToken", response.data.token);
            } catch (error) {
                console.log(error.response.data.message);
                localStorage.removeItem("userToken");
                setIsTokenValid(false);
            }
        };

        checkToken();
    }, []);

    if (isTokenValid === null) {
        // Loading state or any other logic while checking the token
        return null;
    }

    return isTokenValid ? Component : <Navigate to="/signin" />;
};

export default PrivateRoute;
