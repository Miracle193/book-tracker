import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import BooksList from '../components/BooksList'
import { Header } from '@rneui/base'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'

//const renderBooks = onSelect => ({item}) => {return (<BooksList onSelect={onSelect} {...item}/>)}

class BookStatusScreen extends Component {
    handleBookSelect = (book) => {
        this.props.navigation.navigate('About Book', {book})
    }
    renderBooks = ({item}) => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('About Book', {book: item})}>
                <View style={styles.book_card}>
                    <Image style={styles.image} source={{uri: item?.imageLinks?.smallThumbnail ? item.imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}/>
                    <View>
                        <Text>{item.title}</Text>
                        <Text style={{width: 200}} wrap>{item?.authors ? item.authors.join(", ") : ""}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {status} = this.props.route.params
        const books = this.props.bookshelf.filter(book => book.status === status)
    
        return (
            <SafeAreaProvider style={{backgroundColor: 'white'}}>
                <Header 
                    centerComponent={{
                        text: status,
                        style: styles.category_text
                        
                    }}

                    leftComponent={
                        <TouchableOpacity 
                        style={{width: 50}}
                        onPress={() => this.props.navigation.navigate('My Books')}>
                            <Feather 
                            name='chevron-left'
                            size={25}/>
                        </TouchableOpacity>
                    }
                    backgroundColor='white'
                />
                <FlatList
                    data={books}
                    renderItem={this.renderBooks}
                    keyExtractor={item => item.id}
                />
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
    },

    book_card: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#d9dbda',
        borderBottomWidth: "1px",
    },

    image: {
        flex: 0,
        width: 50,
        height: 70,
        marginRight: 20,
      },

    category_text: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    text_view: {
        display: 'flex',
        flexWrap: 'wrap', 
    },
})

const mapStateToProps = state => ({
    currently_reading: state.currently_reading,
    read: state.read,
    want_to_read: state.want_to_read,
    bookshelf: state.bookshelf,
})

export default connect(mapStateToProps)(BookStatusScreen)