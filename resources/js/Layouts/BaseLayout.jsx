import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Link, usePage } from "@inertiajs/react";
import { ThemeProvider } from "@/components/theme-provider";
import { UserDropdown } from "@/components/user-dropdown";

export default function BaseLayout({ children, breadcrumbs = [], header }) {
    const { url } = usePage();
    const paths = url.split('/').filter(Boolean);

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

                                        {breadcrumbs.length > 0 ? (
                                            breadcrumbs.map((crumb, index) => (
                                                <React.Fragment key={index}>
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                    <BreadcrumbItem>
                                                        {crumb.url ? (
                                                            <BreadcrumbLink asChild>
                                                                <Link href={crumb.url} className="hidden md:block">
                                                                    {crumb.title}
                                                                </Link>
                                                            </BreadcrumbLink>
                                                        ) : (
                                                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                                                        )}
                                                    </BreadcrumbItem>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            paths.length > 0 && paths[0] !== 'dashboard' && (
                                                <>
                                                    <BreadcrumbSeparator className="hidden md:block" />
                                                    <BreadcrumbItem>
                                                        <BreadcrumbPage className="capitalize">
                                                            {paths[paths.length - 1].replace('-', ' ')}
                                                        </BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                </>
                                            )
                                        )}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>

                            <div className="flex items-center gap-4">
                                <UserDropdown />
                            </div>
                        </header>

                        <main className="flex-1 p-6 overflow-x-hidden">
                            {header && (
                                <div className="mb-6">
                                    {header}
                                </div>
                            )}
                            <div className="mt-2">
                                {children}
                            </div>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </ThemeProvider>
    );
}
