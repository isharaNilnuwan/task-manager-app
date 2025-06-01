import MainLayout from "@/components/MainLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MainLayout>
                {children}
            </MainLayout>
        </div>
    );
}

