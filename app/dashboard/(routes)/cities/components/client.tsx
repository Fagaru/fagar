"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

import { City } from '@/types/city';

interface CityClientProps {
    data: any
}

export const CityClient: React.FC<CityClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Cities (${data.length})`}
                    description="Liste de nos catégories"
                />
                <Button onClick={() => router.push(`/dashboard/cities/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title="API" description="API calls for Cities" />
            <Separator />
            <ApiList entityName="cities" entityIdName="cityId"/>
        </>
    );
}