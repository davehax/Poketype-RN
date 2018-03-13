import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import imgIcons from "./images.js";

const Type = (props) => {
    return ( <TypeInternal {...props} style={styleType} /> )
}

const TypeFlex = (props) => {
    return ( <TypeInternal {...props} style={styleTypeFlex} /> )
}

const SmallTypeFlex = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlex} /> )
}

const SmallTypeFlexDouble = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlexDouble} /> )
}

const SmallTypeFlexImmune = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlexImmune} /> )
}

const TypeInternal = ({ style, icon, onPress, titleOverride }) => {
    let text = titleOverride ? titleOverride.toUpperCase() : icon.toUpperCase();
    onPress = onPress || function() {};

    let onPressHandler = () => {
        if (typeof(onPress) === "function") {
            onPress(icon);
        }
    }

    return (
        <TouchableOpacity onPress={onPressHandler}>
            <View style={style.viewStyle}>
                <Image style={style.imageStyle} source={imgIcons[icon]} />
                <Text style={style.textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styleType = StyleSheet.create({
    viewStyle: {
        flex: 0,
        width: 120,
        height: 130,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {},
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5
    }
});

const styleTypeFlex = StyleSheet.create({
    viewStyle: {
        flex: 0,
        width: 120,
        height: 130,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {},
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5
    }
});

const styleSmallTypeFlex = StyleSheet.create({
    viewStyle: {
        flex: 0,
        width: 86,
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 50,
        height: 50,
        textAlign: "center"
    },
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5
    }
});

const styleSmallTypeFlexDouble = StyleSheet.create({
    viewStyle: {
        flex: 0,
        width: 86,
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#0E7E12",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 50,
        height: 50,
        textAlign: "center"
    },
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        color: "#FFFFFF"
    }
});

const styleSmallTypeFlexImmune = StyleSheet.create({
    viewStyle: {
        flex: 0,
        width: 86,
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#000000",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 50,
        height: 50,
        textAlign: "center"
    },
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        color: "#FFFFFF"
    }
});

export default Type;
export { TypeFlex, SmallTypeFlex, SmallTypeFlexDouble, SmallTypeFlexImmune };