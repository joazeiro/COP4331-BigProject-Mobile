import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SearchContext, SearchHandler } from './components/SearchContext';
import Navbar from './components/Navbar';
import PostList from './components/PostList';

export default function Home({ navigation }) {
  // Use the context value from SearchContext
  const searchContextValue = useContext(SearchContext);

  return (
    <SearchHandler>
      <View>
        <ScrollView>
        <Navbar />
        {/* Pass the context value as a prop to PostList */}
        <PostList searchQuery={searchContextValue} />
        </ScrollView>
      </View>
    </SearchHandler>
  );
}
