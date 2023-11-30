const Search = (props) => {
    return (
        <form>
            find countries <input value={props.value} onChange={props.onChange} />
        </form>
    )
}

export default Search