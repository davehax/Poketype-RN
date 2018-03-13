import React from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground } from "react-native";
import { Heading1 } from "./components/common.js";
import Type from "./components/type.js";
import types from "./lib/poketype.js";
import BackgroundImage from "./components/backgroundImage.js";
import Picker from "./components/picker.js";
import PickerPanel from "./components/pickerPanel.js";
import EffectivenessProfile from "./components/effectivenessProfile.js";
import { imgPikachoo } from "./components/images.js";

const pikachoo = require("./img/pikachoo.jpg");

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    backgroundImage:{
        flex : 1,
        width : '100%'
    },
    container: {
        flex: 0
    },
    content: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50
    },
    pickers: { 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "row" 
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type1: types.unselected,
            type2: types.unselected,
            pickerPanelVisible: false,
            current: ""
        }

        this.pickType = this.pickType.bind(this);
        this.resetType = this.resetType.bind(this);
        this.onPicked = this.onPicked.bind(this);
        this.onPickerCancel = this.onPickerCancel.bind(this);
    }

    pickType(p) {
        this.setState({
            pickerPanelVisible: true,
            current: p
        })
    }

    resetType(p) {
        let newState = {}
        newState[p] = types.unselected;
        this.setState(newState);
    }

    onPicked(t) {
        let newState = {
            pickerPanelVisible: false,
            current: ""
        };

        newState[this.state.current] = t;

        this.setState(newState);
    }

    onPickerCancel() {
        this.setState({
            pickerPanelVisible: false
        })
    }

    render() {
        return (
            <ImageBackground source={imgPikachoo} style={styles.backgroundImage}>
                {this.state.pickerPanelVisible ? (
                    <PickerPanel onPicked={this.onPicked} onPressCancel={this.onPickerCancel} />
                ) : (
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                        {/* <BackgroundImage /> */}
                        <View style={styles.content}>
                            <Heading1>Poketype</Heading1>
                            <Text>Select one or two types to see their individual or combined strengths and weaknesses</Text>
                            <View style={styles.pickers}>
                                <Picker type={this.state.type1} onPress={() => this.pickType("type1")} onCancelPress={() => this.resetType("type1")} />
                                <Picker type={this.state.type2} onPress={() => this.pickType("type2")} onCancelPress={() => this.resetType("type2")} />
                            </View>

                            {!this.state.pickerPanelVisible && (
                                <EffectivenessProfile type1={this.state.type1} type2={this.state.type2} />
                            )}

                            
                        </View>
                    </ScrollView>
                )}
            </ImageBackground>
        );
    }
}

export default App;

