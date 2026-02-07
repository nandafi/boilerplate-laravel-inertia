import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, LogOut, User } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"

export default function Authenticated({ auth, header, children }) {
    const { url } = usePage()
    const paths = url.split('/').filter(Boolean)

    return (
        <ThemeProvider defaultTheme="light" storageKey="coba-po-theme">
            <div className="bg-premium-gradient min-h-screen">
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="glass-pane m-2 md:m-4 rounded-[2rem] md:rounded-[3rem] overflow-hidden transition-all duration-500 shadow-2xl border border-white/20">
                        <header className="glass-header flex h-16 shrink-0 items-center justify-between gap-2 px-6 sticky top-0 z-10 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink asChild>
                                                <Link href="/dashboard">Dashboard</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {paths.length > 0 && paths[0] !== 'dashboard' && (
                                            <>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage className="capitalize">{paths[paths.length - 1].replace('-', ' ')}</BreadcrumbPage>
                                                </BreadcrumbItem>
                                            </>
                                        )}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>

                            <div className="flex items-center gap-4">
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
                                            <Link href={route('logout')} method="post" as="button" className="flex w-full items-center">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </header>

                        <main className="flex-1 p-6">
                            {header && (
                                <div className="mb-6">
                                    {header}
                                </div>
                            )}
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </ThemeProvider>
    );
}

