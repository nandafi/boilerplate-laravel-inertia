import BaseLayout from "@/Layouts/BaseLayout";

export default function Authenticated({ header, children }) {
    return (
        <BaseLayout header={header}>
            {children}
        </BaseLayout>
    );
}
