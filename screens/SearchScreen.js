import React, { Component } from 'react'
import { ScrollView, View, TextInput, FlatList, TouchableOpacity, Text, Image, StyleSheet, Button, TouchableHighlight } from 'react-native'
import {fetchBooks} from '../api'
import { Header } from '@rneui/base'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'
import SearchBar from '../components/SearchBar';
import BooksList from '../components/BooksList/'

const MAXRESULT = 10
const renderBooks = onSelect => ({item}) => {return (<BooksList onSelect={onSelect} {...item}/>)}

export default class SearchScreen extends Component {
    state = {
        books_query: '',
        books_list: null,
        max_result: 10,
        start_index: 0,
        showMoreBook: false,
    }

    getBooks = async (query, startIndex) => {
        const books = await fetchBooks(query, MAXRESULT, startIndex)
        if (startIndex == 0) {
            this.setState({books_list: books})
            if (books){
                this.setState({showMoreBook: true})
            } 
        } else {
            this.setState(prevState => ({books_list: [...prevState.books_list, ...books]}))
        }
    }

    handleBookQueryChange = query => {
        this.setState({books_query: query, max_result: 10, start_index: 0})
    }

    // renderBooks = ({item}) => {
    //     return (
    //         <TouchableOpacity onPress={() => this.props.navigation.navigate('About Book', {book: {id: item.id, ...item.volumeInfo}})}>
    //             <View style={styles.book_card}>
    //                 <Image style={styles.image} source={{uri: item?.volumeInfo?.imageLinks?.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}/>
    //                 <View>
    //                     <Text>{item.volumeInfo.title}</Text>
    //                     <Text>by {item?.volumeInfo?.authors ? item.volumeInfo.authors.join(", ") : ""}</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    handleBookSelect = (book) => {
        this.props.navigation.navigate('About Book', {book})
    }

    fetchMoreBooks = () => {
        const newMaxResult = this.state.max_result + 10;
        const newStartIndex = this.state.start_index + 10;
        this.setState({max_result: newMaxResult, start_index: newStartIndex})
        this.getBooks(this.state.books_query, newStartIndex);
        if (this.state.max_result >= 40){
            this.setState({showMoreBook: false})
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.books_query != this.state.books_query && this.state.books_query.length > 1) {
            this.getBooks(this.state.books_query, this.state.start_index)
        }
    }

    componentDidMount() {
        this.textInput.focus();
    }


    render() {
        return (
            <SafeAreaProvider style={{backgroundColor: 'white'}}>
                
                <Header
                    centerComponent={
                        <View style={styles.searchBar}>
                            <Feather
                                name="search"
                                size={20}
                                color="grey"
                                style={{ marginLeft: 1 }}
                            />
                            <TextInput 
                                ref={(input) => { this.textInput = input; }}
                                style={styles.input}
                                placeholder="Search Books Here"
                                value={this.state.books_query}
                                onChangeText={this.handleBookQueryChange}
                            />
                        </View>
                    }
                    backgroundColor='#fff'
                />

                {/* <SearchBar 
                    ref={(input) => {this.textInput = input;}} 
                    value={this.state.books_query}
                    onChangeText={this.handleBookQueryChange}
                /> */}
                
                <FlatList
                    data={this.state.books_list}
                    renderItem={renderBooks(this.handleBookSelect)}
                    keyExtractor={item => item.id}
                
                    ListFooterComponent={
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            { this.state.showMoreBook &&
                                (
                                    <View style={styles.button}>
                                        <Button
                                            key="seeMoreButton"
                                            title="See more books..."
                                            onPress={this.fetchMoreBooks}
                                        />
                                    </View> )
                        }
                        </View>
                    }
                />
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    book_card: {
      flexDirection: 'row',
      padding: 10,
      flexWrap: 'wrap',
      borderBottomColor: '#d9dbda',
      borderBottomWidth: "1px",
    },

    image: {
        flex: 0,
        width: 50,
        height: 70,
        marginRight: 20,
    },

    input: {
        fontSize: 20,
        marginLeft: 10,
        width: '100%',
    },

    searchBar: {
        padding: 10,
        flexDirection: 'row',
        width: 350,
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        alignItems: "center",
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
      },

      button: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'black',
      },
      
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },

      genre_list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    card: {
        backgroundColor: 'red',
        height: 70,
        width: 150,
        margin: 5,
        paddingRight: 10,
        paddingTop: 45,
        alignItems: 'flex-left'
    },

    button_text: {
        fontSize: 15,
        color: 'white',
        paddingLeft: 10,
    },

    card_title: {
        fontSize: 15,
    },

    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 1000,
      },
  });
