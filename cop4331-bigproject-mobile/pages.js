import React from 'react';
import { View } from 'react-native';
import { SearchContext, SearchHandler } from './components/SearchContext';
import Navbar from './components/Navbar';
import PostListContainer from './components/PostListContainer';

export default function Home({navigation}) {
    return (
      <SearchHandler>
        <View>
          <Navbar/>
          <PostListContainer>
            {/* Uncomment below line once PostList is defined */}
            {/* <PostList/> */}
          </PostListContainer>
        </View>
      </SearchHandler>
    );
  }