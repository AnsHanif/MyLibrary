import dayjs from "dayjs"

window.getTimeStamp = (timestamp, myFormat = "ddd,MMM D,YYYY hh:mm:ss") => {
    let date = new Date(timestamp.seconds * 1000)
    return dayjs(date).format(myFormat)
}