import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//import { SearchContext } from 'cop4331-bigproject-mobile\components\SearchContext.js'; 
//import { SearchContext, SearchHandler } from 'cop4331-bigproject-mobile\components\SearchContext.js';
import { SearchContext } from './SearchContext';

export const Navbar = () => {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useContext(SearchContext);
    const apiUrl = "https://geobooks-e802c07bfa62.herokuapp.com"; 

    useEffect(() => 
    {
        const checkLoginStatus = async () => 
        {
            let token = null;

            try {
                token = await AsyncStorage.getItem('token');
            } catch (e) {
                console.error(e);
            }

            try
            {
                if (!token)
                {
                    setIsLoggedIn(false);
                    return;
                }

                const response = await fetch(apiUrl + '/',
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            token: token
                        }
                    )
                });

                if (response.ok)
                {
                    setIsLoggedIn(true);
                }
                else 
                {
                    setIsLoggedIn(false);
                }
            }
            
            catch
            {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();

    }, []);

    const handleSearch = (value) =>
    {
        setSearchQuery(value);
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24 }}>GeoBook</Text>
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder = "Search"
                    value = {searchQuery}
                    onChangeText = {handleSearch}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={async () => {
                    await AsyncStorage.setItem('token', '');
                    navigation.navigate('Login');
                }}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    
    
};

export default Navbar;
