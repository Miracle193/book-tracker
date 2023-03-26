import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { CURRENTLY_READING, WANT_TO_READ, READ } from '../redux/reducer'
import { Feather } from '@expo/vector-icons'
import { Header } from '@rneui/base'

class MyBooksScreen extends Component {
    render() {
        const books = this.props.bookshelf
        const currentlyReading = books.filter(book => book.status === CURRENTLY_READING)
        const wantToRead = books.filter(book => book.status === WANT_TO_READ)
        const read = books.filter(book => book.status === READ)
        const numOfCurrentlyReading = currentlyReading.length
        const numOfWantToRead = wantToRead.length
        const numOfRead = read.length

        return (
            <ScrollView style={{ backgroundColor: 'white'}}>
                <Header 
                    centerComponent={{text: "My Books", style: styles.category_text }}
                    backgroundColor="white"
                />

                <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Book Status', {status: CURRENTLY_READING})}
                style={styles.bookshelf_card}
                underlayColor='white'>
                    <View style={styles.card_view}>
                        <Image 
                        source={{uri: currentlyReading[0]?.imageLinks?.smallThumbnail ? currentlyReading[0].imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}
                        style={styles.bookshelf_card_img}/>
                        <View style={styles.card_text_view}>
                            <Text style={styles.bookshelf_text}>{CURRENTLY_READING}</Text>
                            <Text style={styles.num_book_text}>{numOfCurrentlyReading} books</Text>
                        </View>
                        <Feather name='chevron-right' size={35} style={styles.feather_style}/>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Book Status', {status: WANT_TO_READ})}
                style={styles.bookshelf_card}
                underlayColor='white'>
                    <View style={styles.card_view}>
                        <Image 
                        source={{uri: wantToRead[0]?.imageLinks?.smallThumbnail ? wantToRead[0].imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}
                        style={styles.bookshelf_card_img}/>
                        <View style={styles.card_text_view}>
                            <Text style={styles.bookshelf_text}>{WANT_TO_READ}</Text>
                            <Text style={styles.num_book_text}>{numOfWantToRead} books</Text>
                        </View>
                        <Feather name='chevron-right' size={35} style={styles.feather_style}/>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Book Status', {status: READ})}
                style={styles.bookshelf_card}
                underlayColor='white'>
                    <View style={styles.card_view}>
                        <Image 
                        source={{uri: read[0]?.imageLinks?.smallThumbnail ? read[0].imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}
                        style={styles.bookshelf_card_img}/>
                        <View style={styles.card_text_view}>
                            <Text style={styles.bookshelf_text}>{READ}</Text>
                            <Text style={styles.num_book_text}>{numOfRead} books</Text>
                        </View>
                        <Feather name='chevron-right' size={35} style={styles.feather_style}/>
                    </View>
                </TouchableHighlight>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    bookshelf_card: {
        backgroundColor: 'white',
        width: '100%',
        height: 100,
        marginBottom: 0,
        marginTop: 0,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },

    card_view: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '90%',
        marginLeft: 20,
        marginRight: 20,
    },

    bookshelf_card_img: {
        backgroundColor: '#fff',
        height: '75%',
        width: 100,
        top: 25,
        flex: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    card_text_view: {
        justifyContent: 'center',
        marginLeft: 15,
        flex: 3,
        width: 70,
    },

    bookshelf_text: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 10,
    },

    num_book_text: {
        color: 'grey',
    },

    feather_style: {
        color: 'grey',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        flex: 3,
        right: -100
    },

    category_text: {
        fontSize: 25,
        fontWeight: 'bold',
    },
})

const mapStateToProps = state => ({
    bookshelf: state.bookshelf,
})

export default connect(mapStateToProps)(MyBooksScreen)