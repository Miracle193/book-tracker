import API_KEY from './config.js'

export const fetchBooks = async (text, maxResults=10, startIndex=0) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`)
    const {items} = await response.json()
    return items
}

export const fetchBooksByCategory = async (category) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?&q=subject:${category}&orderBy=relevance&key=${API_KEY}`)
    const {items} = await response.json()
    return items
}

export const fetchOrderByThumbnail = async (query, setFunc) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?&q=orderBy=${query}&maxResults=1&key=${API_KEY}`)
    const {items} = await response.json()
    const thumbnail = items[0].volumeInfo.imageLinks.thumbnail
    setFunc(thumbnail)
}

export const fetchBooksByOrderBy = async (order) => {
    const response =  await fetch(`https://www.googleapis.com/books/v1/volumes?&q=orderBy=${order}&key=${API_KEY}`)
    const {items} = await response.json()
    return items
}