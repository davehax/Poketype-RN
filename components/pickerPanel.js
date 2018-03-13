import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Type, { TypeFlex } from "./type.js";
import types, { typesArray } from "../lib/poketype.js";
import { imgCloseButton } from "./images.js";

class PickerPanel extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress(data) {
        this.props.onPicked(data);
    }

    render() {
        return (
            <View style={stylePickerPanel.view}>
                <ScrollView contentContainerStyle={stylePickerPanel.scroll}>
                    {typesArray.map((t, idx) => t === types.unselected ? null : <TypeFlex icon={t} onPress={this.onPress} key={idx} /> )}
                </ScrollView>
                <View style={stylePickerPanel.viewClose}>
                    <TouchableOpacity onPress={this.props.onPressCancel}>
                        <Image source={imgCloseButton} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
//

let { height, width } = Dimensions.get("window");

const stylePickerPanel = StyleSheet.create({
    view: {
        position: "absolute",
        bottom: 0,
        left: 15,
        flex: 1,
        width: width - 30,
        height: height - 45,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: "#888",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    viewClose: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 60
    },
    scroll: {
        flex: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        // width: width - 50,
        // height: height - 50,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: "#fff"
    }
});

export default PickerPanel;