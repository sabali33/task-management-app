import { useEffect, useState } from "react";
import { ColumnType } from "./Components/Table/RowItem";
import { InertiaLinkProps, Link } from "@inertiajs/react";

type RowType = { [prop: string]: unknown };
type TableDataProps = {
    data: Array<RowType>;
    rowActions?: Array<InertiaLinkProps>;
};

export const useTransformToTable = function ({
    data,
    rowActions,
}: TableDataProps) {
    const [tableData, setTableData] = useState<Array<ColumnType[]>>([]);

    const RowActionsComponent = ({
        rowId,
        rowActions,
    }: {
        rowId: number;
        rowActions?: InertiaLinkProps[];
    }) => {
        return rowActions?.map((action, index) => {
            const actionRoute = action.href.replace("%s", String(rowId));
            const colorClass =
                action.method === "delete" ? "text-red-500" : "text-blue-500";
            return (
                <Link
                    {...action}
                    href={actionRoute}
                    key={index}
                    className={`${colorClass} px-6 py-2 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200`}
                >
                    {action.title}
                </Link>
            );
        });
    };
    useEffect(() => {
        const transformedUsers = [] as Array<ColumnType[]>;
        data.forEach((rowItem, index) => {
            const rowData: ColumnType[] = [];
            let lastColumnItem = 0;
            for (let prop in rowItem) {
                lastColumnItem++;
                rowData.push({
                    id: `col-${index}`,
                    text: rowItem[prop as keyof RowType] as string,
                });
                if (lastColumnItem === Object.values(rowItem).length) {
                    rowData.push({
                        id: `col-${index}-${rowItem.id}`,
                        text: "",
                        rowActions: (
                            <RowActionsComponent
                                rowActions={rowActions}
                                rowId={rowItem.id as number}
                            />
                        ),
                    });
                }
            }

            transformedUsers.push(rowData);
        });
        setTableData(transformedUsers);
    }, [data]);

    return tableData;
};
