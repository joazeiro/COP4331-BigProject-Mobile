import React from 'react'
import { View, StyleSheet } from 'react-native';

const PostListContainer = ({ children }) => {
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            {children}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    paddingHorizontal: 4,
  },
  innerContainer: {
    width: '100%',
    maxHeight: '80%',  // You might need to adjust this value according to your needs
    padding: 8,
  }
});

export default PostListContainer;
