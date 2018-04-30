import React from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Button } from "react-native";
import { Heading1, ContainerPadded } from "./components/common.js";
import { imgPikachoo } from "./components/images.js";
import Type from "./components/type.js";
import types from "./lib/poketype.js";
import BackgroundImage from "./components/backgroundImage.js";
import Picker from "./components/picker.js";
import PickerPanel from "./components/pickerPanel.js";
import EffectivenessProfile from "./components/effectivenessProfile.js";
import Legend from "./components/legend.js";
import ModalFilterPicker from 'react-native-modal-filter-picker';
import pokedata from "./lib/pokedata.json";
import { Font } from "expo";

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
        paddingTop: 40,
        paddingBottom: 0
    },
    pickers: { 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            type1: types.unselected,
            type2: types.unselected,
            pickerPanelVisible: false,
            current: "",
            pokemonPickerVisible: false,
            pokemonPickerPicked: ""
        }

        this.pokemonOptions = pokedata.map((mon) => {
            return {
                key: mon.name,
                label: mon.name
            }
        })

        this.pickType = this.pickType.bind(this);
        this.resetType = this.resetType.bind(this);
        this.onTypePicked = this.onTypePicked.bind(this);
        this.onTypePickerCancel = this.onTypePickerCancel.bind(this);
        this.onPokemonSelect = this.onPokemonSelect.bind(this);
        this.onPokemonCancel = this.onPokemonCancel.bind(this);
        this.onPokemonShow = this.onPokemonShow.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            "barlow-condensed-bold": require("./assets/fonts/barlow-condensed-bold.ttf"),
            "barlow-condensed-regular": require("./assets/fonts/barlow-condensed-regular.ttf")
        });

        this.setState({
            fontLoaded: true
        })
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

    onTypePicked(t) {
        let newState = {
            pickerPanelVisible: false,
            current: ""
        };

        newState[this.state.current] = t;

        this.setState(newState);
    }

    onTypePickerCancel() {
        this.setState({
            pickerPanelVisible: false
        })
    }

    onPokemonShow() {
        this.setState({
            pokemonPickerVisible: true
        })
    }

    onPokemonSelect(picked) {
        let newState = {
            pokemonPickerPicked: picked,
            pokemonPickerVisible: false
        }

        // set type1 and type2
        let pokemon = pokedata.filter((mon) => mon.name === picked)[0];

        // Every pokemon has at least one type
        newState.type1 = pokemon.types[0];

        // If the pokemon selected has a second type we must set that as well,
        if (pokemon.types.length > 1) {
            newState.type2 = pokemon.types[1];
        }
        // Otherwise unselect the second type
        else {
            newState.type2 = types.unselected;
        }

        this.setState(newState);
    }

    onPokemonCancel() {
        this.setState({
            pokemonPickerVisible: false
        });
    }

    render() {
        if (!this.state.fontLoaded) {
            return (
                <ImageBackground source={imgPikachoo} style={styles.backgroundImage}>
                    <ContainerPadded>
                        <Text>Loading fonts...</Text>
                    </ContainerPadded>
                </ImageBackground>
            )
        }
        else {
            return (
                <ImageBackground source={imgPikachoo} style={styles.backgroundImage}>
                    {this.state.pickerPanelVisible ? (
                        <PickerPanel onPicked={this.onTypePicked} onPressCancel={this.onTypePickerCancel} />
                    ) : (
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                            {/* <BackgroundImage /> */}
                            <View style={styles.content}>
                                <ContainerPadded>
                                    <Heading1>Poketype</Heading1>
                                    <Text style={ { fontFamily: "barlow-condensed-regular" } }>Select one or two types to see their individual or combined strengths and weaknesses</Text>
                                </ContainerPadded>
                                <View style={styles.pickers}>
                                    <Picker type={this.state.type1} onPress={() => this.pickType("type1")} onCancelPress={() => this.resetType("type1")} />
                                    <View style={{ width: 5 }} />
                                    <Picker type={this.state.type2} onPress={() => this.pickType("type2")} onCancelPress={() => this.resetType("type2")} />
                                </View>

                                <ContainerPadded>
                                    <Button title="Pick a Pokemon" onPress={this.onPokemonShow} style={ { fontFamily: "barlow-condensed-regular" } } />

                                    <ModalFilterPicker
                                        visible={this.state.pokemonPickerVisible}
                                        onSelect={this.onPokemonSelect}
                                        onCancel={this.onPokemonCancel}
                                        options={this.pokemonOptions}
                                    />
                                </ContainerPadded>

                                <ContainerPadded>
                                    <Legend />
                                </ContainerPadded>

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
}

export default App;

