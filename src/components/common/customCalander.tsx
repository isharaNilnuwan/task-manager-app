"use client"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface CustomCalendarProps {
    popoverOpen: boolean;
    handleCalanderOpenChange: (open: boolean) => void;
    calendarSelectTriggerElem: React.ReactNode;
    date: Date | undefined;
    handleDateSelect: (date: Date | undefined) => void
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
    popoverOpen,
    handleCalanderOpenChange,
    calendarSelectTriggerElem,
    date,
    handleDateSelect,
}) => {
        
    return (
        <Popover open={popoverOpen} onOpenChange={handleCalanderOpenChange}>
            <PopoverTrigger asChild>
                {calendarSelectTriggerElem}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default CustomCalendar;