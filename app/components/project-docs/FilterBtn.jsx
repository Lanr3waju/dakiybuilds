function FilterBtn() {
    return (
        <details className="dropdown">
            <summary className="m-1 btn btn-accent btn-circle mr-1 text-neutral-content text-xs font-semibold">Filter</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><a>Filter by Format</a></li>
                <li><a>Filter by Date Uploaded</a></li>
            </ul>
        </details>
    )
}
export default FilterBtn
