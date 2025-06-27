import { cn } from "@/lib/utils";
import React from "react"

interface BudgeProps{
    children:React.ReactNode;
    className?:string;

}

export default function Budge({children,className}:BudgeProps) {
  return (
    <span className={cn("w-fit bg-primary px-2 py-1 text-xs text-primary-foreground",className)}>{children}</span>
  )
}
