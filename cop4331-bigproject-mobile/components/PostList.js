import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SearchContext } from './SearchContext';

const PostList = () => {
    const [searchQuery] = useContext(SearchContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    // Handle non-200 status codes
                    setError('Failed to fetch posts');
                    return;
                }

                const data = await response.json();
                setPosts(data.results);
                setLoading(false);
            } catch (error) {
                // Handle network or other fetch-related errors
                setError('Failed to fetch posts: ' + error.message);
            }
        };

        fetchData();
    }, [searchQuery]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
         <View style={{ backgroundColor: 'red' }}>
            {posts.map((post, index) => (
                <View key={index}>
                    <Text>Author: {post.author}</Text>
                    <Text>Posted: {post.posted}</Text>
                    <Text>Title: {post.title}</Text>
                    <Text>Tag: {post.tag}</Text>
                    <Text>Content: {post.content}</Text>
                </View>
            ))}
        </View>
    );
};

export default PostList;

