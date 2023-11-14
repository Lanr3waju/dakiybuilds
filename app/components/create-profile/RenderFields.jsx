export const renderInputField = (name, label, type, formData, handleChange, inputRef, error) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-primary-content">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        ref={inputRef} // Use useRef directly here
        className={`${error ? 'input-error' : 'input-success'} input mb-2 mt-1 w-full font-Roboto shadow-md shadow-accent/30 placeholder:text-primary-content/10`}
      />
      {error && <p className="mb-4 text-sm font-semibold lowercase text-error/60">{error}</p>}
    </div>
  )
}
