import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchContext } from './SearchContext';

const Header = ({ onSearch, onSignOut }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (text) => {
    setSearch(text);
    onSearch(text);
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>GeoBook</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Search..."
          placeholderTextColor="#116A7B66"
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onSignOut}>
        <Text style={styles.loginButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const PostList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useContext(SearchContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleSignOut = () => {
    navigation.navigate('Login');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geobooks-e802c07bfa62.herokuapp.com/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tag: searchQuery,
          })
        });

        if (!response.ok) {
          setError('Failed to fetch posts');
          return;
        }

        const data = await response.json();
        setPosts(data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts: ' + error.message);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header onSearch={handleSearch} onSignOut={handleSignOut} />
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header onSearch={handleSearch} onSignOut={handleSignOut} />
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={handleSearch} onSignOut={handleSignOut} />
      <View style={styles.postsContainer}>
        <ScrollView style={{}}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Text style={styles.createdBy}><Text style={styles.postLabel}>Created by</Text> {post.author}</Text>
                <Text style={styles.createdBy}><Text style={styles.postLabel}>Posted:</Text> {post.posted}</Text>
              </View>
              <View style={styles.titleTag}>
                <Text style={styles.postLabel}><Text style={styles.postLabel}></Text> <Text style={styles.titleText}>{post.title}</Text></Text>
                <View style={styles.tagBox}>
                  <Text style={styles.tagText}><Text style={styles.postLabel}></Text> {post.tag}</Text>
                </View>
              </View>
              <Text style={styles.commentLabel}><Text style={styles.commentLabelText}></Text> {post.content}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -315,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#ECE5C7',
    borderColor: '#116A7B',
    borderWidth: 3,
    borderRadius: 30,
    marginBottom: 9.7,
  },
  title: {
    flex: 1,
    fontSize: 19.3,
    color: '#116A7B',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputView: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: -14,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#116A7B',
    borderRadius: 11,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: '#ffffff'
  },
  postsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 5000,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  postContainer: {
    backgroundColor: '#ECE5C7',
    borderRadius: 25,
    padding: 12,
    alignItems: 'flex-start',
    width: '85%',
    marginTop: 5,
    maxWidth: 400,
    borderColor: '#116A7B',
    borderWidth: 3,
    alignSelf: 'center', // center align the post container
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  tagBox: {
    backgroundColor: '#BFFFFF',
    borderRadius: 18,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  tagText: {
    color: '#116A7B',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postLabel: {
    color: '#116A7B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  createdBy: {
    fontSize: 10,
    marginBottom: 10,
  },
  titleText: { 
    fontSize: 25,
    color: '#116A7B'
  },
  commentLabel: {
    fontSize: 12,
    marginTop: 7,
    color: '#116A7B'
  },
  commentLabelText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default PostList;