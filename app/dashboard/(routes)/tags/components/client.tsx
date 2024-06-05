"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

import { Tag } from '@/types/tag';

interface TagClientProps {
    data: Tag[]
}

export const TagClient: React.FC<TagClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Tags (${data.length})`}
                    description="Liste de nos tags"
                />
                <Button onClick={() => router.push(`/dashboard/tags/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title="API" description="API calls for Tags" />
            <Separator />
            <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    );
}