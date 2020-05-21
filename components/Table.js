import { useTable, useSortBy } from "react-table"

// per example at https://github.com/tannerlinsley/react-table/blob/master/examples/sorting/src/App.js
export default ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
    )

    return (
        <table {...getTableProps()}>
            <thead className="uppercase text-gray-600 text-sm font-semibold">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps(),
                                )}
                                className="py-3 text-left"
                            >
                                {column.render("Header")}
                                {/* Add a sort direction indicator */}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? " 🔽"
                                            : " 🔼"
                                        : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-gray-700">
                {rows.map((row, rowIndex) => {
                    prepareRow(row)
                    return (
                        <tr
                            {...row.getRowProps()}
                            className={
                                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                        >
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-2 py-3"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
