import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FormTitle = () => {
    return (
        <Text style={styles.title}>GeoBook</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default FormTitle;
