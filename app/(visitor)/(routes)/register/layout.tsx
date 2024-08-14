import Container from "@/components/ui/container";


export default async function RegisterLayout({
   children
} : {
    children: React.ReactNode;
}) {

    return (
        <>
        <div className="bg-gray-50 dark:bg-slate-950">
            <Container>
                <div className="flex flex-row">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </Container>
        </div>
        </>
    );
}