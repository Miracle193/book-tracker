import React from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Header } from '@rneui/base';
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const SearchBar = (props) => {
    // const navigation = useNavigation();

    // const [searchText, setSearchText] = useState('')

    // const handleSearch = (text) => {
    //     setSearchText(text)
    //     navigation.navigate('Search', {text: text})
    // }

    // return (
    //     <View style={styles.container}>
    //         <TextInput
    //             style={styles.input}
    //             placeholder='Search Books Here'
    //             value={searchText}
    //             onChangeText={handleSearch}
    //         />
    //     </View>
    // )
    return (
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
                        style={styles.input}
                        placeholder="Search Books Here"
                        value={props.value}
                        ref={props.ref}
                        onFocus={props.onFocus}
                        onChangeText={props.onChangeText}
                    />
                </View>
            
            }
            backgroundColor="fff"
        />
    )
}

const styles = StyleSheet.create({
    // container: {
    //     alignItems: "center",
    //     flexDirection: "row",
    //     width: "50%", 
    //     backgroundColor: "#d9dbda",
    //     borderRadius: 15,
    //     padding: 0
    // },

    // input: {
    //     fontSize: 20,
    //     marginLeft: 10,
    //     width: "90%",
    // },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: '100%',
        color: 'grey',
    },

    searchBar: {
        padding: 10,
        flexDirection: 'row',
        width: 350,
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        alignItems: "center",
    },
})

SearchBar.propTypes = {
    ref: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
}

export default SearchBar