"use client"

import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface DropDownProps {
    onOpenChange: (open: boolean) => void;
    dropdownTriggerElement: React.ReactNode;
    render: () => React.ReactNode;

}
const CustomDropdownMenu: React.FC<DropDownProps> = ({
    onOpenChange,
    dropdownTriggerElement,
    render
}) => {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                {dropdownTriggerElement}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                {render()}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CustomDropdownMenu;