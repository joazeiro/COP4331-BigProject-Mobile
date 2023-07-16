import React from 'react';
import { View, StyleSheet } from 'react-native';

const FormContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        padding: 4,
    },
    content: {
        maxWidth: '90%',
        width: '100%',
    },
});

export default FormContainer;
