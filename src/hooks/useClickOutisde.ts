import { useEffect, useRef } from 'react';

type Callback = () => void;

// This hook triggers the callback when the user clicks outside the function
const useClickOutside = (callback: Callback, taskAddingInProgress: boolean) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {        
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        if (taskAddingInProgress) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [taskAddingInProgress]);

    return ref;
};

export default useClickOutside;
