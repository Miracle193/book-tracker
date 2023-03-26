import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

const SearchButton = (props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* <Button
                title="Search"
                onPress={() => navigation.navigate('Search')}
            /> */}

            <TouchableHighlight 
                style={{width: 24}}
                onPress={() => navigation.navigate('Search')}
            >
                <Feather
                    name="search"
                    size={24}
                />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        width: "50%", 
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        padding: 0
    },
})

export default SearchButton