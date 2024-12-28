/* eslint-disable react/prop-types */
const Notification = ({ message, type }) => {
    const colour = type ? 'red' : 'green'
    const messageStyle = {
        'color': colour,
        'background': "lightgrey",
        'fontSize': "20px",
        'borderStyle': "solid",
        'borderRadius': "5px",
        'padding': "10px",
        'marginBottom': "10px"
    }

    if (message === null) {
        return null
    }
    return (
        <div className="notification" style={messageStyle} >
            { message }
        </div>
    )
}

export default Notification
