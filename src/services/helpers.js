export const getDate = (dateString) => {
    const d = new Date(dateString)
    return d.toDateString() + ", " + d.toLocaleTimeString()
}

export const DELETED = "[DELETED]"


export const getUser = (userList, id) => {
    const dataList = Object.keys(userList)
    // console.log(dataList, id, userList.hasOwnProperty(id))

    if (dataList.length > 0) {
        if (userList.hasOwnProperty(id)) {

            return userList[id]
        } else {
            const dummyData = Object.assign({},
                ...Object.keys(userList[dataList[0]]).
                    map(f => ({ [f]: DELETED }))
            )
            return dummyData
        }
    }
    // This function is predicated on the assumption that it won't be 
    // called until userList has been populated.
}