import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const BackgroundImage = ({ empty }) => {
    return (
        <View style={backgroundStyle.imageContainer}>
            <Image style={backgroundStyle.image} source={require("../img/pikachoo.jpg")} />
        </View>
    )
}

const resizeMode = "cover";
const backgroundStyle = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
    }
});

export default BackgroundImage;