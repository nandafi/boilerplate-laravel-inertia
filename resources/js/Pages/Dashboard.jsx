import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
    Package,
    ShoppingCart,
    TrendingUp
} from "lucide-react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
        >
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's what's happening with your store today.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-emerald-500 flex items-center">
                                    <ArrowUpRight className="h-3 w-3" /> +20.1%
                                </span>{" "}
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-emerald-500 flex items-center">
                                    <ArrowUpRight className="h-3 w-3" /> +180.1%
                                </span>{" "}
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-emerald-500 flex items-center">
                                    <ArrowUpRight className="h-3 w-3" /> +19%
                                </span>{" "}
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-emerald-500 flex items-center">
                                    <ArrowUpRight className="h-3 w-3" /> +201
                                </span>{" "}
                                since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>
                                Monthly revenue performance for the current year.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full bg-muted/20 rounded-xl border border-dashed flex items-center justify-center overflow-hidden relative group">
                                <div className="absolute inset-0 flex items-end justify-between px-8 pb-8">
                                    {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85, 60, 90].map((val, i) => (
                                        <div
                                            key={i}
                                            className="w-[6%] bg-primary/20 hover:bg-primary/40 transition-all rounded-t-sm relative group/bar"
                                            style={{ height: `${val}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border shadow-sm">
                                                ${val * 100}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
                                    <TrendingUp className="h-8 w-8" />
                                    <span className="text-sm font-medium">Chart Data Visualization</span>
                                </div>

                                {/* Area chart line effect using SVG */}
                                <svg className="absolute inset-x-0 bottom-8 h-full w-full pointer-events-none" preserveAspectRatio="none">
                                    <path
                                        d="M0,300 L0,180 Q100,120 200,160 T400,100 T600,140 T800,80 T1000,120 L1000,300 Z"
                                        className="fill-primary/5 stroke-primary/30 stroke-2"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                You have 24 unread notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {[
                                    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", icon: ShoppingCart },
                                    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", icon: Package },
                                    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", icon: Users },
                                    { name: "William Kim", email: "will@email.com", amount: "+$99.00", icon: CreditCard },
                                    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", icon: Activity },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="bg-muted h-9 w-9 rounded-full flex items-center justify-center">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.email}</p>
                                        </div>
                                        <div className="font-medium text-sm">{item.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

