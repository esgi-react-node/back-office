import {useRef, useEffect} from "react";

export const useFocusRef = () => {
    const ref = useRef();
    
    useEffect(() => {
        ref.current.focus();
    }, []);

    return ref;
};
