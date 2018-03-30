import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import imgIcons from "./images.js";
import _ from "lodash";

const Type = (props) => {
    return ( <TypeInternal {...props} style={styleType} /> )
}

const TypeFlex = (props) => {
    return ( <TypeInternal {...props} style={styleTypeFlex} /> )
}

const SmallTypeFlex = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlex} /> )
}

const SmallTypeFlexDoubleResist = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlexDoubleResist} /> )
}

const SmallTypeFlexDoubleVulnerable = (props) => {
    return ( <TypeInternal {...props} style={styleSmallTypeFlexDoubleVulnerable} /> )
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

// Base styles for small type 
const baseSmallTypeFlex = {
    viewStyle: {
        flex: 0,
        width: 86,
        height: 100,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    textStyle: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5
    }
};

const styleSmallTypeFlex = StyleSheet.create(baseSmallTypeFlex);

// Small Flex Double Resist
const styleSmallTypeFlexDoubleResist = StyleSheet.create({
    viewStyle: _.assignIn({}, baseSmallTypeFlex.viewStyle, {
            backgroundColor: "#0E7E12",
            borderRadius: 10
    }),
    imageStyle: baseSmallTypeFlex.imageStyle,
    textStyle: _.assignIn({}, baseSmallTypeFlex.textStyle, {
        color: "#FFFFFF"
    })
});

// Small Flex Double Vulnerable
const styleSmallTypeFlexDoubleVulnerable = StyleSheet.create({
    viewStyle: _.assignIn({}, baseSmallTypeFlex.viewStyle, {
            backgroundColor: "#FF0000",
            borderRadius: 10
    }),
    imageStyle: baseSmallTypeFlex.imageStyle,
    textStyle: _.assignIn({}, baseSmallTypeFlex.textStyle, {
        color: "#FFFFFF",
        textShadowColor: "#000000",
        textShadowRadius: 2
    })
});

// Small Flex Immune
const styleSmallTypeFlexImmune = StyleSheet.create({
    viewStyle: _.assignIn({}, baseSmallTypeFlex.viewStyle, {
            backgroundColor: "#000000",
            borderRadius: 10
    }),
    imageStyle: baseSmallTypeFlex.imageStyle,
    textStyle: _.assignIn({}, baseSmallTypeFlex.textStyle, {
        color: "#FFFFFF"
    })
});

export default Type;
export { TypeFlex, SmallTypeFlex, SmallTypeFlexDoubleResist, SmallTypeFlexDoubleVulnerable, SmallTypeFlexImmune };