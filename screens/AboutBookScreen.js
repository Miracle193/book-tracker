import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableHighlight } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { updateCurrentlyReading, updateRead, updateWantToRead } from '../redux/actions'
import { connect } from 'react-redux'
import { Ionicons, Feather } from '@expo/vector-icons'

const BOOK_STATUS = ['Add to Bookshelf', 'Want to Read', 'Currently Reading', 'Read']

class AboutBookScreen extends Component {

    state = {
        book_status: 'Want to Read',
        book_status_index: 0,
        dropdown: styles.dropdown,
        dropdown_text: styles.dropdown_text,
    }

    handleBookStatusChange = (status, index) => {
        this.setState({dropdown: styles.dropdown_selected, dropdown_text: styles.dropdown_selected_text})

        const { book } = this.props.route.params;
        const bookInShelf = this?.props?.bookshelf ? this.props.bookshelf.find((b) => b.id === book.id) : null

        if (bookInShelf) {
            if (bookInShelf.status === status) {
                return
            }

            bookInShelf.status = status

        } else {

            if (status === "Want to Read") {
                this.props.updateWantToRead(book)
                this.setState({book_status_index: 1, book_status: 'Want to Read'})
            } else if (status === "Read") {
                this.props.updateRead(book)
                this.setState({book_status_index: 3, book_status: 'Read'})
            } else if (status === "Currently Reading") {
                this.props.updateCurrentlyReading(book)
                this.setState({book_status_index: 2, book_status: 'Currently Reading'})
            }
        }
    }

    componentDidMount() {
        const { book } = this.props.route.params;
        bookInShelf = this.props.bookshelf.find((b) => b.id === book.id)

        if (bookInShelf) {
            if (bookInShelf.status === "Want to Read") {
                this.setState({book_status_index: 1, book_status: 'Want to Read'})
            } else if (bookInShelf.status === "Read") {
                this.setState({book_status_index: 3, book_status: 'Read'})
            } else if (bookInShelf.status === "Currently Reading") {
                this.setState({book_status_index: 2, book_status: 'Currently Reading'})
            }
            this.setState({dropdown: styles.dropdown_selected, dropdown_text: styles.dropdown_selected_text})
        }

    }

    render() {
        const { averageRating } = this.props.route.params.book
        const { ratingsCount } = this.props.route.params.book
        const stars = [];
        for (var i = 1; i <= 5; i++) {
            let path = 'ios-star-outline'

            if (i <= averageRating) {
                path = 'ios-star'
            }

            stars.push((<Ionicons name={path} color='rgb(29, 155, 240)'/>))
        }

        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={styles.img_view}>
                    <Image style={styles.img} source={{uri: this.props.route.params.book?.imageLinks?.thumbnail ? this.props.route.params.book.imageLinks.thumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}/>
                </View>
                <View style={styles.title_name_view}>
                    <Text style={styles.title}>{this.props.route.params.book.title}</Text>
                    <Text style={styles.authors}>by {this.props.route.params.book?.authors ? this.props.route.params.book.authors.join(", ") : ""}</Text>
                </View>
                <View style={styles.ratings_view}>
                    <View style={styles.star_view}>
                        {stars}
                        <Text style={styles.averageRating}>{this.props.route.params.book.averageRating}</Text>
                    </View>
                    <Text style={styles.count}>{ratingsCount ? ratingsCount : '0'} ratings</Text>
                </View>
                <View style={styles.status_view}>
                    <SelectDropdown
                        data={BOOK_STATUS}
                        onSelect={this.handleBookStatusChange}
                        defaultValueByIndex={this.state.book_status_index}
                        buttonStyle={this.state.dropdown}
                        buttonTextStyle={this.state.dropdown_text}
                        selectedRowStyle={styles.selected_row}
                        disabledIndexs={[0]}
                        renderDropdownIcon={isOpened => {
                            return <Feather name={isOpened ? 'chevron-up' : 'chevron-down'} color={this.state.book_status_index === 0 ? 'white' : 'black'} size={20}/>
                        }}
                    />
                </View>
                <View style={styles.desc_view}>
                    <Text style={styles.about_book}>About This Book</Text>
                    <Text>{this.props.route.params.book.description}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    img_view: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    img: {
        flex: 0,
        width: 200,
        height: 300,
        marginBottom: 20,
        marginTop: 30,
      },

    title_name_view: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    },

    authors: {
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
    },

    ratings_view: {
        
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    star_view: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginLeft: 20,
    },

    averageRating: {
        marginLeft: 10,
    },

    count: {
        marginRight: 20,
        flex: 1, 
        textAlign: 'right',
    },

    status_view: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    dropdown: {
        backgroundColor: 'rgb(29, 155, 240)',
        borderRadius: 5,
    },

    dropdown_text: {
        color: 'white',
    },

    dropdown_selected: {
        backgroundColor: '#fff',
        borderColor: 'rgb(29, 155, 240)',
        borderWidth: 1.5,
        borderRadius: 5,
    },

    dropdown_selected_text: {
        color: 'black'
    },

    selected_row: {
        backgroundColor: 'white',
    },

    desc_view: {
        margin: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    about_book: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold',
    }
})

const mapStateToProps = state => ({
    bookshelf: state.bookshelf
});

export default connect(mapStateToProps, {updateCurrentlyReading: updateCurrentlyReading, updateRead: updateRead, updateWantToRead: updateWantToRead})(AboutBookScreen)