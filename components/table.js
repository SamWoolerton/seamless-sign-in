import { useTable, useSortBy, usePagination } from "react-table"

// per examples at
// sorting: https://github.com/tannerlinsley/react-table/blob/master/examples/sorting/src/App.js
// pagination: https://github.com/tannerlinsley/react-table/blob/master/examples/pagination/src/App.js
export default ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // only rows for the active page
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination,
    )

    return (
        <>
            <table {...getTableProps()}>
                <thead className="uppercase text-gray-600 text-sm font-semibold tracking-wide">
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
                                                ? " 🠗"
                                                : " 🠕"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="text-gray-700">
                    {page.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr
                                {...row.getRowProps()}
                                className={
                                    rowIndex % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-white"
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

            {pageCount > 1 && (
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        {[
                            {
                                text: "<<",
                                fn: () => gotoPage(0),
                                cond: canPreviousPage,
                            },
                            {
                                text: "<",
                                fn: () => previousPage(),
                                cond: canPreviousPage,
                            },
                            {
                                text: ">",
                                fn: () => nextPage(),
                                cond: canNextPage,
                            },
                            {
                                text: ">>",
                                fn: () => gotoPage(pageCount - 1),
                                cond: canNextPage,
                            },
                        ].map(({ text, fn, cond }) => (
                            <button
                                onClick={fn}
                                disabled={!cond}
                                className={
                                    "mr-1 " +
                                    (cond
                                        ? "bg-gray-200 text-gray-900"
                                        : "bg-white text-gray-500")
                                }
                                key={text}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                    <span className="text-gray-600">
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                </div>
            )}
        </>
    )
}
