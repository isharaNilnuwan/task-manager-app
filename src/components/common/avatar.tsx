import { User } from "@/types/task.types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getFirstAndLastInitials } from "@/utils/appUtils"

export const getAvater = (user: User) => {
    return (
        <Avatar>
            <AvatarImage src={user.avatar} alt="@shadcn" />
            <AvatarFallback>{getFirstAndLastInitials(user.name)}</AvatarFallback>
        </Avatar>
    )
}