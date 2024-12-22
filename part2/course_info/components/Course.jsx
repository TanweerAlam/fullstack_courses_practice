/* eslint-disable react/prop-types */
import Content from "../components/Content"
import Header from "../components/Header"
import Total from "./Total"

const Course = ({ course }) => {
    console.log(course)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course
