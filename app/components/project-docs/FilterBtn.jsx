function FilterBtn() {
  return (
    <details className="dropdown">
      <summary className="btn btn-circle btn-accent m-1 text-xs font-semibold text-neutral-content">
        Filter
      </summary>
      <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
        <li>
          <a>Filter by Format</a>
        </li>
        <li>
          <a>Filter by Date Uploaded</a>
        </li>
      </ul>
    </details>
  )
}
export default FilterBtn
