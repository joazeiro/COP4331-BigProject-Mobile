import React from 'react';
import { View } from 'react-native';
import { SearchContext, SearchHandler } from './components/SearchContext';
import Navbar from './components/Navbar';

export default function Home({navigation}) {
  return (
    <SearchHandler>
      <View>
        <Navbar/>
        {/* Once you have your other components ready, you can add them here */}
        {/* <PostListContainer>
          <PostList/>
        </PostListContainer> */}
      </View>
    </SearchHandler>
  );
}