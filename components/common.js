import React, { Component, PureComponent } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions, TouchableNativeFeedback, Text } from 'react-native';

const style = StyleSheet.create({
    heading1: {
        fontSize: 28,
        fontFamily: "barlow-condensed-bold",
        fontWeight: "bold"
    },
    heading2: {
        fontSize: 18,
        fontFamily: "barlow-condensed-regular",
        fontWeight: "bold"
    }
});

// Common Styles as an object
const CommonStyles = {
    text: {
        fontFamily: "barlow-condensed-regular",
        fontSize: 16
    },
    textSmall: {
        fontFamily: "barlow-condensed-regular",
        fontSize: 13
    }
};

// Common Styles as a StyleSheet
const CommonStyleSheet = StyleSheet.create(CommonStyles);

// Heading 1 Pure Component
class Heading1 extends PureComponent {
    render() {
        return ( <Text style={style.heading1}>{this.props.children}</Text> )
    }
}

// Heading 2 Pure Component
class Heading2 extends PureComponent {
    render() {
        return ( <Text style={style.heading2}>{this.props.children}</Text> )
    }
}

// Container Pure Component
class Container extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        )
    }
}

// Container Padded Pure Component
class ContainerPadded extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                {this.props.children}
            </View>
        )
    }
}

// Container Padded Vertical Pure Component
class ContainerPaddedVertical extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
                {this.props.children}
            </View>
        )
    }
}

export default Container;
export {
    CommonStyles,
    CommonStyleSheet,
    ContainerPadded,
    ContainerPaddedVertical,
    Heading1,
    Heading2
}