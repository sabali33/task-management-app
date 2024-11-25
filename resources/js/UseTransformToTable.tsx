import { useEffect, useState } from "react";
import { ColumnType } from "./Components/Table/RowItem";
import { InertiaLinkProps, Link } from "@inertiajs/react";

export type RowType = { [prop: string]: unknown };
/**
 * T stands additional link props we may need
 */
export type AppLinkPropsType<T = true> = T extends true
    ? InertiaLinkProps & RowType
    : InertiaLinkProps;

type TableDataProps = {
    data: Array<RowType>;
    rowActions?: Array<AppLinkPropsType>;
    rowActionFilter?: (row: RowType) => (action: InertiaLinkProps) => boolean;
};

export const useTransformToTable = function ({
    data,
    rowActions,
    rowActionFilter,
}: TableDataProps) {
    const [tableData, setTableData] = useState<Array<ColumnType[]>>([]);

    const RowActionsComponent = ({
        rowId,
        rowActions,
        filter,
        rowData,
    }: {
        rowId: number;
        rowActions?: AppLinkPropsType[];
        filter?: (action: InertiaLinkProps) => boolean;
        rowData?: { [props: string]: any };
    }) => {
        let actionsEligibleForEditing = rowActions;
        if (filter !== undefined) {
            actionsEligibleForEditing = rowActions?.filter((rowAction) => {
                return filter(rowAction);
            });
        }

        return actionsEligibleForEditing?.map((action, index) => {
            const actionRoute = action.href.replace("%s", String(rowId));
            const colorClass =
                action.method === "delete" ? "text-red-500" : "text-blue-500";

            const applyData = action.applyData as Function;
            const data = action.applyData ? applyData(rowData) : undefined;

            return (
                <Link
                    {...action}
                    href={actionRoute}
                    key={index}
                    className={`${colorClass} px-6 py-2 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200`}
                    data={data}
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
                                filter={
                                    rowActionFilter
                                        ? rowActionFilter(rowItem)
                                        : undefined
                                }
                                rowData={rowItem}
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
