import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Type from "./type.js";
import { imgCloseButton } from "./images.js";
// import PickerPanel from "./pickerPanel.js";

class Picker extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
        this.onCancelPress = this.onCancelPress.bind(this);
    }

    onPress(evt) {
        // pass event back to parent
        if (typeof(this.props.onPress) === "function") {
            this.props.onPress();
        }
    }

    onCancelPress(evt) {
        // pass event back to parent
        if (typeof(this.props.onCancelPress) === "function") {
            this.props.onCancelPress();
        }
    }

    render() {
        return (
            <View style={pickerStyle.border}>
                <View style={pickerStyle.view}>
                    <Type icon={this.props.type} onPress={this.onPress} />
                    <TouchableOpacity onPress={this.onCancelPress}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image source={imgCloseButton} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const pickerStyle = StyleSheet.create({
    view: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 180,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,

        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#0E7E12",
        borderWidth: 2,

        backgroundColor: "rgb(237,247,238)"
    },
    border: {
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "rgb(237,247,238)",
        borderWidth: 2
    }
})

export default Picker;