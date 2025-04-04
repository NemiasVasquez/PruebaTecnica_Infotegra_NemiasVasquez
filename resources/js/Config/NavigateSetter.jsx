import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigateFunction } from "./AuthHelper";

const NavigateSetter = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigateFunction(navigate);
    }, [navigate]);

    return null;
};

export default NavigateSetter;
