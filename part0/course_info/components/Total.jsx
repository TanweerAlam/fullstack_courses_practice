const Total = ({parts}) => {
    return (
        <p>Number of exercises {parts.reduce((acc, next) => acc + next.exercises, 0)}</p>
    )
}

export default Total
