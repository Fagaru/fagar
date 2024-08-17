"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@radix-ui/react-separator";
import { ApiList } from "@/components/ui/api-list";

import { columns } from "./columns";

import { User } from '@/types/user';

interface UserClientProps {
    data: any
}

export const UserClient: React.FC<UserClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Comptes utilisateurs (${data.length})`}
                    description="Liste de nos utilisateurs"
                />
                <Button onClick={() => router.push(`/dashboard/users/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="first_name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Users" />
            <Separator />
            <ApiList entityName="users" entityIdName="UserId"/>
        </>
    );
}