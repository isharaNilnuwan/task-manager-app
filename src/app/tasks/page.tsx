import SubtaskMenu from "@/components/tasks/subtasksMenu"
import { TaskTypes } from "@/constants/constants"
import { Record } from "iconsax-react"

const Dashboard = () => {
    return (
        <>
            <div className="flex h-full p-4">
                <div className="flex-1 min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 mx-2 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                        <SubtaskMenu type={TaskTypes.ToDo}/>
                    </div>
                </div>
                <div className="flex-1 min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 mx-2 flex flex-col">                
                    <div className="flex-1 overflow-y-auto">
                    <SubtaskMenu type={TaskTypes.InProgress}/>
                    </div>
                </div>
                <div className="flex-1 min-w-[200px] border-dashed border-2 border-gray-300 rounded-lg p-4 mx-2 flex flex-col">                                        
                    <div className="flex-1 overflow-y-auto">
                    <SubtaskMenu type={TaskTypes.Complete}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard