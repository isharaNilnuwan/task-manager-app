import { User } from "@/types/task.types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFirstAndLastInitials } from "@/utils/appUtils"

export const getAvater = (user: User, size: number) => {
    const sizeClass = `w-${size} h-${size}`;
    return (
        <Avatar className={sizeClass}>
            <AvatarImage src={user.avatar} alt="@shadcn" 
            className="object-cover w-full h-full"/>
            <AvatarFallback className="text-xs">{getFirstAndLastInitials(user.name)}</AvatarFallback>
        </Avatar>
    )
}

export const avatarWithName = (user: User, size: number) => {
    return (
        <div className="flex items-center space-x-4">
            {getAvater(user, size)}
            <p>{user.name}</p>
        </div>
        
    )
}