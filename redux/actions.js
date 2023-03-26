export const UPDATE_WANT_TO_READ = "UPDATE_WANT_TO_READ"
export const UPDATE_READ = "UPDATE_READ"
export const UPDATE_CURRENTLY_READING = "UPDATE_CURRENTLY_READING"

export const updateWantToRead = newBook => ({
    type: UPDATE_WANT_TO_READ,
    payload: newBook,
})

export const updateRead = newBook => ({
    type: UPDATE_READ,
    payload: newBook,
})

export const updateCurrentlyReading = newBook => ({
    type: UPDATE_CURRENTLY_READING,
    payload: newBook,
})