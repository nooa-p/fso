const Search = (props) => {
    return (
        <form onSubmit={props.default}>
            find countries <input value={props.value} onChange={props.onChange} />
        </form>
    )
}

export default Search