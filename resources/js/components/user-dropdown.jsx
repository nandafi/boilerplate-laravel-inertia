import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";

export function UserDropdown() {
    const { auth } = usePage().props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 outline-none">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${auth.user.name}.png`} alt={auth.user.name} />
                        <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start text-xs">
                        <span className="font-semibold">{auth.user.name}</span>
                        <span className="text-muted-foreground">{auth.user.email}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('profile.edit')} className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                    <Link href={route('logout')} method="post" as="button" className="flex w-full items-center text-left">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
