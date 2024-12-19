import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad, total, positivePercentage}) => {
    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral}/>
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="all" value={total}/>
                    <StatisticLine text="average" value={(good*1 + neutral*0 - bad*1)/total}/>
                    <StatisticLine text="positive" value={`${positivePercentage}%`}/>
                </tbody>
            </table>
        </div>
    )
}

export default Statistics
