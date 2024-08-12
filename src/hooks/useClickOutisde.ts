import { useEffect, useRef } from 'react';

type Callback = () => void;

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
            console.log("#$ add mousedown event")
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            console.log("#$ remove mousedown event")
        };
    }, [taskAddingInProgress]);

    return ref;
};

export default useClickOutside;
