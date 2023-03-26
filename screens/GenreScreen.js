import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { fetchBooksByCategory, fetchBooksByOrderBy} from '../api'
import BooksList from '../components/BooksList'
import { Header } from '@rneui/base'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'

const renderBooks = onSelect => ({item}) => {return (<BooksList onSelect={onSelect} {...item}/>)}

export default class Genre extends Component {
    state = {
        books_list: null,
    }

    getBooks = async () => {
        const params = this.props.route.params
        // const books = await fetchBooksByCategory(params.category)
        // this.setState({books_list: books})
        
        if (params.category){
            const books = await fetchBooksByCategory(params.category)
            this.setState({books_list: books})
        } else if (params.order) {
            const books = await fetchBooksByOrderBy(params.order)
            this.setState({books_list: books})
        }
    }

    handleBookSelect = (book) => {
        this.props.navigation.navigate('About Book', {book})
    }

    // renderBooks = ({item}) => {
    //     return (
    //         <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('About Book', {book: {id: item.id, ...item.volumeInfo}})}>
    //             <Image style={styles.image} source={{uri: item?.volumeInfo?.imageLinks?.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}/>
    //             <View>
    //                 <Text>{item.volumeInfo.title}</Text>
    //                 <Text>{item?.volumeInfo?.authors ? item.volumeInfo.authors.join(", ") : ""}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    componentDidMount() {
        this.getBooks()
    }

    render() {
        const { order } = this.props.route.params
        const { category } = this.props.route.params
        let capitalized = ''

        if (category) {
            capitalized = category.charAt(0).toUpperCase() + category.slice(1)
        } else if (order) {
            capitalized = order === 'relevance' ? 'Current BestSellers' : 'New Releases'
        }

        return (
            <SafeAreaProvider>
                <Header 
                    centerComponent={{
                        text: capitalized,
                        style: styles.category_text
                        
                    }}

                    leftComponent={
                        <TouchableOpacity 
                        style={{width: 50}}
                        onPress={() => this.props.navigation.navigate('Home Screen')}>
                            <Feather 
                            name='chevron-left'
                            size={25}/>
                        </TouchableOpacity>
                    }
                    backgroundColor='white'
                />
                <FlatList
                    style={{backgroundColor: 'white'}}
                    data={this.state.books_list}
                    renderItem={renderBooks(this.handleBookSelect)}
                    keyExtractor={item => item.id}
                />
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    category_text: {
        fontSize: 25,
        fontWeight: 'bold',
    },

})