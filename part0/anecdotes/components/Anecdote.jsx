const Anecdote = ({text, content, votes}) => {
    return (
        <div>
            <h2>{text}</h2>
            <p>
                {content}
                <br />
                has {votes} votes
            </p>

        </div>
    )
}

export default Anecdote
