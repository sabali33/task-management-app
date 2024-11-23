export const RowItem = ({row}) => {
    return <>
        {
            row.map((colum, key )=> <td key={key} className='py-3 px-6 text-left whitespace-nowra'> {colum}</td>)
}
    </>
}
