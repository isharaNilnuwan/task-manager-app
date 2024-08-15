import { dueDateStyles, priorityStyles } from "@/config/tasks.config";
import { Priority } from "@/constants/constants"
import { getDueDateStatus, getRemainingTimeText, get_M_D_Format } from "@/utils/appUtils"
import { Clock } from "iconsax-react"

export const date_M_D_FormatWrapper = (date: string) => {
    const deadLinStatus = getDueDateStatus(date);
    const { backgroundColor, contentColor } = dueDateStyles[deadLinStatus];
    return (      
        <div className="flex items-center bg-gray-100 text-sm rounded-lg px-1 py-1"
        style={{ backgroundColor: backgroundColor }}>
            <p style={{ color: contentColor }}>{get_M_D_Format(date)}</p>
        </div>
    );
}

export const M_D_FormatDateWrapper = (date: string) => {
    const deadLinStatus = getDueDateStatus(date);
    const { backgroundColor, contentColor } = dueDateStyles[deadLinStatus];
    return (      
        <p style={{ color: contentColor }}>{get_M_D_Format(date)}</p>
    );
}

export const priorityTaskWrapper = (priority: Priority) => {
    const { backgroundColor, contentColor } = priorityStyles[priority];
    return (      
        <div className="flex items-center bg-gray-100 text-sm rounded-lg px-2 py-1"
        style={{ backgroundColor: backgroundColor }}>
            <div 
                className="w-1.5 h-1.5 rounded-full mr-2" 
                style={{ backgroundColor: contentColor }}
            ></div>
            <p style={{ color: contentColor }}>{priority}</p>
        </div>
    );
};
export const dueDateTextWrapper = (date: string) => {
    return (
        <div className="flex fle-row gap-2">
            <Clock size="20" color="#222222" />
            {<p style={{ fontSize: '0.815rem' }}>{getRemainingTimeText(date)}</p>}
        </div>

    )
}