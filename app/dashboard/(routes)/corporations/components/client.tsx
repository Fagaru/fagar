"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";
import { Corporation } from '@/types/corporation';
import AddCorporation from "@/components/AddCorporation";

interface CorporationClientProps {
    data: Corporation[]
}

export const CorporationsClient: React.FC<CorporationClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Entreprises (${data.length})`}
                    description="Liste de nos entreprises"
                />
                <AddCorporation />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId"/>
        </>
    );
}