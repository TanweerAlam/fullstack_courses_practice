/* eslint-disable react/prop-types */
const Total = ({parts}) => {
    return (
        <strong>
            <p>total of {parts.reduce((acc, next) => acc + next.exercises, 0)} exercises</p>
        </strong>
    )
}

export default Total
