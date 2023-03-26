import React, { Component, useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, Image} from 'react-native'
import SearchBar from '../components/SearchBar'
import { fetchOrderByThumbnail } from '../api'
import { useNavigation } from '@react-navigation/native';

const NEWEST =  'newest'
const RELEVANCE = 'relevance'

const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [newestImgSrc, setNewestImgSrc] = useState('')
    const [relevanceImgSrc, setRelevanceImgSrc] = useState('')

    useEffect(() => {
        fetchOrderByThumbnail(NEWEST, setNewestImgSrc) 
        fetchOrderByThumbnail(RELEVANCE, setRelevanceImgSrc)
    }, [])

        return (
            <ScrollView style={styles.container}>

                <SearchBar onFocus={() => navigation.navigate('Search')}/>

                <View style={{marginBottom: 20}}>
                    <View style={styles.heading_text_view}>
                        <Text style={styles.heading_text}>Genres</Text>
                    </View>
                    <View style={styles.genre_list}>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'classics'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Classics</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'romance'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Romance</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'fantasy'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Fantasy</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'fiction'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Fiction</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'biography'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Non-fiction</Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        onPress={() => navigation.navigate('Genre', {category: 'young adult'})}
                        style={styles.card}
                        underlayColor='rgb(29, 155, 240)'>
                            <Text style={styles.button_text}>Young Adult</Text>
                        </TouchableHighlight>

                    </View>
               </View>

               <View>
                    <View style={styles.heading_text_view}><Text style={styles.heading_text}>More to Explore</Text></View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableHighlight 
                        style={styles.explore_card}
                        onPress={() => navigation.navigate('Genre', {order: RELEVANCE})}
                        underlayColor='white'>
                            <View style={styles.explore_card_items_view}>
                                <Text style={styles.explore_card_text}>Current BestSellers</Text>
                                <Image style={styles.explore_card_img} source={{uri: relevanceImgSrc}}/>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight 
                        style={styles.explore_card}
                        onPress={() => navigation.navigate('Genre', {order: NEWEST})}
                        underlayColor='white'>
                            <View style={styles.explore_card_items_view}>
                                <Text style={styles.explore_card_text}>New Release this year</Text>
                                <Image style={styles.explore_card_img} source={{uri: newestImgSrc}}/>
                            </View>
                        </TouchableHighlight>
                    </View>
               </View>

            </ScrollView>
        )
    }

const styles = StyleSheet.create({
    container: {
        marginRight: 5,
        backgroundColor: 'white',
    },

    heading_text_view: {
        margin: 10,
    },

    heading_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    genre_list: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    card: {
        backgroundColor: 'rgb(29, 155, 240)',
        height: 70,
        width: 125,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        paddingRight: 10,
        paddingTop: 45,
        alignItems: 'flex-end'
    },

    button_text: {
        fontSize: 15,
        color: 'white',
        paddingLeft: 10,
    },

    card_title: {
        fontSize: 15,
    },

    explore_card: {
        backgroundColor: 'white',
        width: '80%',
        height: 200,
        borderRadius: 8,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    explore_card_items_view: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },

    explore_card_text: {
        padding: 5,
        width: 125,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 8,
    },

    explore_card_img: {
        alignItems: 'flex-end',
        width: 125,
        height: 150,
        left: 50,
        marginBottom: 0,
        marginTop: 50,
        borderRadius: 5,
    },
    
})

export default HomeScreen