function FilterBtn() {
  return (
    <details className="dropdown">
      <summary className="btn btn-circle btn-accent m-1 text-xs font-semibold text-secondary-content">
        Filter
      </summary>
      <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-accent text-accent-content p-2 shadow text-xs">
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
