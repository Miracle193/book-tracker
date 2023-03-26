import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'

const BooksList = props => {
    return (
    <TouchableOpacity 
    style={styles.container}
    onPress={() => props.onSelect({id: props.id, ...props.volumeInfo})}>
        <View style={styles.book_card}>
            <Image style={styles.image} source={{uri: props.volumeInfo?.imageLinks?.smallThumbnail ? props.volumeInfo.imageLinks.smallThumbnail : 'https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg'}}/>
            <View style={styles.text_view}>
                <Text>{props.volumeInfo.title}</Text>
                <Text style={{width: 200}} wrap>by {props?.volumeInfo?.authors ? props.volumeInfo.authors.join(", ") : ""}</Text>
            </View>
        </View>
    </TouchableOpacity>
    )
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

    text_view: {
        display: 'flex',
        flexWrap: 'wrap', 
    },
})

BooksList.propTypes = {
    id: PropTypes.string,
    volumeInfo: PropTypes.object
}

export default BooksList