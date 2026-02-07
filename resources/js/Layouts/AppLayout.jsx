import BaseLayout from "@/Layouts/BaseLayout";

export default function AppLayout({ children, breadcrumbs = [] }) {
    return (
        <BaseLayout breadcrumbs={breadcrumbs}>
            {children}
        </BaseLayout>
    );
}
