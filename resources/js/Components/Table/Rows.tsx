import {RowItem} from "@/Components/RowItem";
export const Rows = ({data}) => {
    return <>
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            {
                data.map((rowItem, key )=> <RowItem key={key}/>)
            }
        </tr>

    </>
}
