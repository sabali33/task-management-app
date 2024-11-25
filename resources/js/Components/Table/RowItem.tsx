export type ColumnType = {
    id: number | string;
    text: string | number;
    rowActions?: JSX.Element | JSX.Element[];
};
export const RowItem = ({ row }: { row: ColumnType[] }) => {
    let Row = row.map((column: ColumnType, colIndex: number) => {
        const { text, rowActions, id } = column;
        return (
            <>
                <td
                    className="py-3 px-6 text-left whitespace-nowrap"
                    key={`${id}-${colIndex}`}
                >
                    {text}
                    {rowActions && rowActions}
                </td>
            </>
        );
    });

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">{Row}</tr>
    );
};
