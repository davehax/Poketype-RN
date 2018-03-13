import React, { Component, PureComponent } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions, TouchableNativeFeedback, Text } from 'react-native';

const style = StyleSheet.create({
    heading1: {
        fontSize: 24,
        fontWeight: "bold"
    },
    heading2: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

class Heading1 extends PureComponent {
    render() {
        return ( <Text style={style.heading1}>{this.props.children}</Text> )
    }
}

class Heading2 extends PureComponent {
    render() {
        return ( <Text style={style.heading2}>{this.props.children}</Text> )
    }
}

class Container extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.children}
            </View>
        )
    }
}

class ContainerPadded extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                {this.props.children}
            </View>
        )
    }
}

class ContainerPaddedVertical extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
                {this.props.children}
            </View>
        )
    }
}

// const Container = (props) => {
//     return (
//         <View style={{ flex: 1}}>{props.children}</View>
//     )
// }

// const Heading1 = (props) => {
//     return (
//         <Text style={style.heading1}>{props.children}</Text>
//     )
// }

export default Container;
export {
    ContainerPadded,
    ContainerPaddedVertical,
    Heading1,
    Heading2
}