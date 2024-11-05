import { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState({ display: false, message: '', type: '' });

    const showAlert = (message, type) => {
        setAlert({ display: true, message, type });

        setTimeout(() => {
            setAlert({ display: false, message: '', type: '' });
        }, 5000);
    };

    return [alert, showAlert];
};


export default useAlert;