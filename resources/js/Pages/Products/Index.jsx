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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        sku: "",
        barcode: "",
        name: "",
        unit: "",
        purchase_price: "",
        selling_price: "",
        category_id: "",
        stock_quantity: 0,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('products.index'), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    const openCreateDialog = () => {
        setEditingProduct(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (product) => {
        setEditingProduct(product);
        setData({
            sku: product.sku,
            barcode: product.barcode || "",
            name: product.name,
            unit: product.unit,
            purchase_price: product.purchase_price,
            selling_price: product.selling_price,
            category_id: product.category_id.toString(),
            stock_quantity: product.stock_quantity,
        });
        setIsDialogOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            put(route("products.update", editingProduct.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route("products.store"), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const deleteProduct = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("products.destroy", id));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Master Data" }, { title: "Products" }]}>
            <Head title="Products" />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                    <Button onClick={openCreateDialog}>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by name, SKU, or barcode..."
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
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price (Sell)</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.data.length > 0 ? (
                                        products.data.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">{product.sku}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{product.name}</span>
                                                        <span className="text-xs text-muted-foreground">{product.barcode}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{product.category?.name}</TableCell>
                                                <TableCell>
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.selling_price)}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={product.stock_quantity <= 5 ? "text-destructive font-bold" : ""}>
                                                        {product.stock_quantity} {product.unit}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => openEditDialog(product)}
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="text-destructive hover:bg-destructive/10"
                                                            onClick={() => deleteProduct(product.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No products found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                Page {products.current_page} of {products.last_page}
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!products.prev_page_url}
                                    onClick={() => router.get(products.prev_page_url)}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!products.next_page_url}
                                    onClick={() => router.get(products.next_page_url)}
                                >
                                    Next <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
                        <DialogDescription>
                            {editingProduct
                                ? "Update product details and click save."
                                : "Fill in the details to create a new product inventory item."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="sku">SKU (Internal Code)</Label>
                                <Input
                                    id="sku"
                                    value={data.sku}
                                    onChange={(e) => setData("sku", e.target.value)}
                                    placeholder="PROD-001"
                                    className={errors.sku ? "border-destructive" : ""}
                                />
                                {errors.sku && <span className="text-xs text-destructive">{errors.sku}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="barcode">Barcode</Label>
                                <Input
                                    id="barcode"
                                    value={data.barcode}
                                    onChange={(e) => setData("barcode", e.target.value)}
                                    placeholder="899321..."
                                    className={errors.barcode ? "border-destructive" : ""}
                                />
                                {errors.barcode && <span className="text-xs text-destructive">{errors.barcode}</span>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Paper Clip"
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData("category_id", value)}
                                >
                                    <SelectTrigger className={errors.category_id ? "border-destructive" : ""}>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <span className="text-xs text-destructive">{errors.category_id}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    value={data.unit}
                                    onChange={(e) => setData("unit", e.target.value)}
                                    placeholder="pcs, box, rim"
                                    className={errors.unit ? "border-destructive" : ""}
                                />
                                {errors.unit && <span className="text-xs text-destructive">{errors.unit}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="purchase_price">Purchase Price</Label>
                                <Input
                                    id="purchase_price"
                                    type="number"
                                    value={data.purchase_price}
                                    onChange={(e) => setData("purchase_price", e.target.value)}
                                    placeholder="0"
                                    className={errors.purchase_price ? "border-destructive" : ""}
                                />
                                {errors.purchase_price && <span className="text-xs text-destructive">{errors.purchase_price}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="selling_price">Selling Price</Label>
                                <Input
                                    id="selling_price"
                                    type="number"
                                    value={data.selling_price}
                                    onChange={(e) => setData("selling_price", e.target.value)}
                                    placeholder="0"
                                    className={errors.selling_price ? "border-destructive" : ""}
                                />
                                {errors.selling_price && <span className="text-xs text-destructive">{errors.selling_price}</span>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock_quantity">Initial Stock Quantity</Label>
                            <Input
                                id="stock_quantity"
                                type="number"
                                value={data.stock_quantity}
                                onChange={(e) => setData("stock_quantity", e.target.value)}
                                className={errors.stock_quantity ? "border-destructive" : ""}
                            />
                            {errors.stock_quantity && <span className="text-xs text-destructive">{errors.stock_quantity}</span>}
                        </div>

                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {editingProduct ? "Save Changes" : "Create Product"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
