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
            console.log(rowId);
            const actionRoute = action.href.replace("%s", String(rowId));
            return (
                <Link {...action} href={actionRoute} key={index}>
                    {action.title}
                </Link>
            );
        });
    };
    useEffect(() => {
        const transformedUsers = [] as Array<ColumnType[]>;
        data.forEach((rowItem, index) => {
            console.log(rowItem);
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
