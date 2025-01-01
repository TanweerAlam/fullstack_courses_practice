/* eslint-disable react/prop-types */
const ShowButton = ({ show, setShow, country}) => {
    return (
        <button onClick={() => setShow(show === country ? null : country)}>show</button>
    )
}

export default ShowButton
