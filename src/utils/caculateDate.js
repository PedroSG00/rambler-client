const calculateRealDate = (date) => {

    return `${new Date(date).getDay()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
}

export default calculateRealDate