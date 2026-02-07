import React from "react";
import { router } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Pagination({ meta }) {
    if (!meta) return null;

    const {
        current_page,
        last_page,
        per_page,
        from,
        to,
        total,
    } = meta;

    // Generate page numbers
    const maxPagesToShow = 5;
    let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(last_page, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const handlePerPageChange = (value) => {
        router.get(
            window.location.pathname,
            { ...route().params, per_page: value, page: 1 },
            { preserveState: true }
        );
    };

    const navigate = (url) => {
        if (url) router.get(url);
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
                    <Select
                        value={per_page.toString()}
                        onValueChange={handlePerPageChange}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    Showing {from || 0} to {to || 0} of {total} entries
                </div>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    disabled={current_page === 1}
                    onClick={() => navigate(meta.first_page_url)}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    disabled={current_page === 1}
                    onClick={() => navigate(meta.prev_page_url)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                    {startPage > 1 && (
                        <>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => navigate(meta.first_page_url)}
                            >
                                1
                            </Button>
                            {startPage > 2 && <span className="text-muted-foreground">...</span>}
                        </>
                    )}

                    {pages.map((page) => (
                        <Button
                            key={page}
                            variant={current_page === page ? "default" : "outline"}
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                if (current_page !== page) {
                                    const params = { ...route().params, page };
                                    router.get(route(route().current()), params);
                                }
                            }}
                        >
                            {page}
                        </Button>
                    ))}

                    {endPage < last_page && (
                        <>
                            {endPage < last_page - 1 && <span className="text-muted-foreground">...</span>}
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => navigate(meta.last_page_url)}
                            >
                                {last_page}
                            </Button>
                        </>
                    )}
                </div>

                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    disabled={current_page === last_page}
                    onClick={() => navigate(meta.next_page_url)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    disabled={current_page === last_page}
                    onClick={() => navigate(meta.last_page_url)}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
