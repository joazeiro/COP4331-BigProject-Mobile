import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SearchContext } from './SearchContext';

export const Navbar = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useContext(SearchContext);
    const [inputText, setInputText] = useState('');

    const handleSearch = () => {
        setSearchQuery(inputText);
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24 }}>GeoBook</Text>
            <View>
                <TextInput
                    placeholder="Search"
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity onPress={handleSearch}>  
                    <Text>Search</Text>
                </TouchableOpacity>
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
