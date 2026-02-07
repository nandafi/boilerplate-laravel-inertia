import * as React from "react"
import {
    BarChart3,
    FileText,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Tags,
    Truck,
    Users,
    ChevronRight,
} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Master",
            url: "#",
            icon: Package,
            items: [
                {
                    title: "Category",
                    url: "/categories",
                    icon: Tags,
                },
                {
                    title: "Supplier",
                    url: "/suppliers",
                    icon: Truck,
                },
                {
                    title: "Products",
                    url: "/products",
                    icon: Package,
                },
                {
                    title: "User",
                    url: "/users",
                    icon: Users,
                },
            ],
        },
        {
            title: "Transaction",
            url: "#",
            icon: ShoppingCart,
            items: [
                {
                    title: "Purchase Order",
                    url: "/purchase-orders",
                    icon: ShoppingCart,
                },
                {
                    title: "Request Order",
                    url: "/request-orders",
                    icon: FileText,
                },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: BarChart3,
            items: [
                {
                    title: "Sales Report",
                    url: "/reports/sales",
                },
                {
                    title: "Inventory Report",
                    url: "/reports/inventory",
                },
            ],
        },
    ],
}

import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar({ ...props }) {
    const { url } = usePage()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <Sidebar
            collapsible="icon"
            className={cn(
                "transition-all duration-500 ease-in-out",
                isCollapsed ? "[--sidebar:var(--primary)] !border-none" : "bg-sidebar"
            )}
            {...props}
        >
            <SidebarHeader className={cn("transition-all duration-500", isCollapsed ? "p-2 pt-4" : "p-4")}>
                <SidebarMenu>
                    <SidebarMenuItem className="flex justify-center">
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent group/logo">
                            <Link href="/dashboard" className={cn(
                                "flex items-center gap-3 transition-all duration-500",
                                isCollapsed ? "flex-col justify-center gap-0 w-full" : ""
                            )}>
                                <div className={cn(
                                    "flex aspect-square size-10 items-center justify-center rounded-xl transition-all duration-500 shadow-lg",
                                    isCollapsed
                                        ? "bg-primary-foreground text-primary scale-110 mb-0 shadow-primary-foreground/20"
                                        : "bg-primary text-primary-foreground rotate-0"
                                )}>
                                    <Package className={cn("transition-all duration-500", isCollapsed ? "size-6" : "size-5")} />
                                </div>
                                <div className={cn(
                                    "flex flex-col gap-0.5 leading-none transition-all duration-500 delay-100",
                                    isCollapsed ? "h-0 opacity-0 overflow-hidden" : "opacity-100"
                                )}>
                                    <span className="font-bold text-lg tracking-tight">CobaPO</span>
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-70">Admin Panel v1.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup className="py-4">
                    <SidebarMenu className="gap-y-1.5">
                        {data.navMain.map((item) => {
                            const isActive = item.url !== "#" ? url === item.url : item.items?.some(sub => url === sub.url)

                            return item.items ? (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.items?.some(sub => url.startsWith(sub.url))}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={cn(
                                                    "h-12 rounded-xl transition-all duration-300",
                                                    isCollapsed
                                                        ? "justify-center p-0 w-12 mx-auto text-primary-foreground hover:bg-white/10 active:bg-white/20"
                                                        : "hover:bg-primary/5 hover:ml-1 px-4",
                                                    isActive && !isCollapsed && "bg-primary/5 text-primary font-semibold"
                                                )}
                                            >
                                                {item.icon && <item.icon className={cn("shrink-0 transition-all duration-300", isCollapsed ? "size-6 text-primary-foreground" : "size-5")} />}
                                                <span className={cn("font-medium transition-all duration-300", isCollapsed ? "hidden" : "ml-1")}>
                                                    {item.title}
                                                </span>
                                                <ChevronRight className={cn(
                                                    "ml-auto size-4 transition-transform duration-300",
                                                    isCollapsed ? "hidden" : "group-data-[state=open]/collapsible:rotate-90"
                                                )} />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="px-2">
                                            <SidebarMenuSub className="ml-4 mt-1 border-l-2 border-primary/10 gap-y-1">
                                                {item.items.map((subItem) => {
                                                    const subActive = url === subItem.url
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={subActive}
                                                                className={cn(
                                                                    "h-9 px-4 rounded-lg transition-all duration-200",
                                                                    subActive
                                                                        ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                                                                        : "hover:bg-primary/5 hover:translate-x-1"
                                                                )}
                                                            >
                                                                <Link href={subItem.url} className="flex items-center gap-2">
                                                                    {subItem.icon && <subItem.icon className="size-4" />}
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={isActive}
                                        className={cn(
                                            "h-12 rounded-xl transition-all duration-300",
                                            isCollapsed
                                                ? "justify-center p-0 w-12 mx-auto text-primary-foreground hover:bg-white/10 active:bg-white/20"
                                                : isActive
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02] px-4"
                                                    : "hover:bg-primary/5 hover:ml-1 px-4"
                                        )}
                                    >
                                        <Link href={item.url} className={cn("flex items-center gap-3", isCollapsed ? "justify-center w-full" : "")}>
                                            {item.icon && <item.icon className={cn("shrink-0 transition-all duration-300", isCollapsed ? "size-6 text-primary-foreground" : "size-5")} />}
                                            <span className={cn("font-medium transition-all duration-300", isCollapsed ? "hidden" : "ml-1")}>
                                                {item.title}
                                            </span>
                                            {isActive && !isCollapsed && (
                                                <div className="absolute left-1 h-6 w-1 rounded-full bg-primary-foreground/50" />
                                            )}
                                            {isActive && isCollapsed && (
                                                <div className="absolute inset-y-2 left-0 w-1.5 rounded-r-full bg-white shadow-[0_0_12px_white] z-10" />
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={cn(
                "transition-all duration-500 overflow-hidden",
                isCollapsed ? "bg-primary border-white/10 p-2" : "bg-muted/30 p-4 border-t border-sidebar-border"
            )}>
                <div className={cn(
                    "flex items-center justify-between gap-2",
                    isCollapsed ? "justify-center" : ""
                )}>
                    {!isCollapsed && (
                        <div className="flex flex-col transition-all duration-500">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                Interface
                            </span>
                            <span className="text-sm font-semibold">Appearance</span>
                        </div>
                    )}
                    {!isCollapsed && <ThemeToggle />}
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
