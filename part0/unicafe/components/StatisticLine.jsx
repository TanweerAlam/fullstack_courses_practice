const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{String(value)}</td>
        </tr>
    )
}

export default StatisticLine
