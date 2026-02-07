import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pagination from "@/components/pagination";

export default function Index({ categories, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(route('categories.index'), { search, page: 1 }, {
            preserveState: true,
            replace: true,
        });
    };

    // Auto-search when search is cleared
    React.useEffect(() => {
        if (search === "" && filters.search) {
            handleSearch();
        }
    }, [search]);

    const openCreateDialog = () => {
        setEditingCategory(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (category) => {
        setEditingCategory(category);
        setData("name", category.name);
        setIsDialogOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route("categories.update", editingCategory.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route("categories.store"), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const deleteCategory = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            destroy(route("categories.destroy", id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Master Data" }, { title: "Categories" }]}>
            <Head title="Categories" />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search categories..."
                                    className="pl-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit" variant="secondary">Search</Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.data.length > 0 ? (
                                        categories.data.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell className="font-medium">{category.id}</TableCell>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>{new Date(category.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => openEditDialog(category)}
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="text-destructive hover:bg-destructive/10"
                                                            onClick={() => deleteCategory(category.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No categories found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination meta={categories} links={categories.links} />
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? "Make changes to your category here. Click save when you're done."
                                : "Enter the name of the new category you want to create."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g. Electronics"
                                    className={errors.name ? "border-destructive" : ""}
                                />
                                {errors.name && (
                                    <span className="text-xs text-destructive">{errors.name}</span>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {editingCategory ? "Save Changes" : "Create Category"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
