import { TableHeader } from "@/Components/Table/TableHeader";
import { ColumnType, RowItem } from "./RowItem";
export const Table = ({
    data,
    tableHeader,
    noDataLabel,
}: {
    data: Array<ColumnType[]>;
    tableHeader: string[];
    noDataLabel: string;
}) => {
    return (
        <>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        {<TableHeader headers={tableHeader} />}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        data.map((row, rowIndex) => {
                            return <RowItem row={row} key={rowIndex} />;
                        })}
                </tbody>
            </table>
            {data.length < 1 && (
                <p className="text-center text-gray-500 mt-4">{noDataLabel}</p>
            )}
        </>
    );
};
