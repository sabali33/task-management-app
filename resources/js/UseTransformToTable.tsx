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
            return (
                <Link href={actionRoute} key={index} title={action.title}>
                    {action.title}
                </Link>
            );
        });
    };
    useEffect(() => {
        const transformedUsers = [] as Array<ColumnType[]>;
        data.forEach((rowItem, index) => {
            const rowData: ColumnType[] = [];
            let lastItem = index + 1 === data.length;
            console.log(lastItem, index, data.length);
            for (let prop in rowItem) {
                rowData.push({
                    id: `col-${index}`,
                    text: rowItem[prop as keyof RowType] as string,
                });
            }
            rowData.push({
                id: "actiopn-row",
                text: "",
                rowActions: lastItem ? (
                    <RowActionsComponent
                        rowActions={rowActions}
                        rowId={rowItem.id as number}
                    />
                ) : undefined,
            });
            transformedUsers.push(rowData);
        });
        setTableData(transformedUsers);
    }, [data]);

    return tableData;
};