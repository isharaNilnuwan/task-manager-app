"use client"

import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface DropDownProps {
    onOpenChange?: (open: boolean) => void;
    dropdownTriggerElement: React.ReactNode;
    render: () => React.ReactNode;
    dropDownWidth: string;

}
const CustomDropdownMenu: React.FC<DropDownProps> = ({
    onOpenChange,
    dropdownTriggerElement,
    render,
    dropDownWidth
}) => {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <div role="button"  tabIndex={0}>
                {dropdownTriggerElement}
                </div>                
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={dropDownWidth}>
                {render()}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CustomDropdownMenu;