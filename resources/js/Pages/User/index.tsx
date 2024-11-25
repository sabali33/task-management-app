import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, InertiaLinkProps, Link, usePage } from "@inertiajs/react";
import { Table } from "@/Components/Table/Table";
import {
    AppLinkPropsType,
    RowType,
    useTransformToTable,
} from "@/UseTransformToTable";

type UserType = { firstName: string; lastName: string; id: number };

export default function Users() {
    const { props } = usePage<{
        props: { users: Array<UserType> };
        auth: { user: { name: string; id: number; email: string } };
    }>();
    const users = props.users as Array<UserType>;
    const { user } = props.auth;
    const rowActions: AppLinkPropsType[] = [
        {
            href: "/task-list",
            method: "get",
            title: "Go to Task Lists",
        },
    ];

    const rowActionFilter = (row: RowType) => {
        return (action: InertiaLinkProps) => {
            if (user.id === 1) {
                return true;
            }
            return user.id === row.id;
        };
    };

    const tableData = useTransformToTable({
        data: users,
        rowActions,
        rowActionFilter,
    });
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                }
            >
                <Head title="Task List" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="container mx-auto p-4">
                                    <div className="overflow-x-auto">
                                        {tableData.length > 0 && (
                                            <Table
                                                data={tableData}
                                                tableHeader={[
                                                    "id",
                                                    "name",
                                                    "email",
                                                    "Actions",
                                                ]}
                                                noDataLabel={
                                                    "No Users created yet"
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
