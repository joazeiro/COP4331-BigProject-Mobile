import React from 'react';
import { Image, StyleSheet } from 'react-native';

const FormTitle = () => {
    return (
        <Image style={styles.image} source={require("cop4331-bigproject-mobile/assets/geobook-logo.png")} />
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: 10,
        marginBottom: 25,
        width: 150,
        height: 40,
        alignSelf: 'center',
    },
});

export default FormTitle;