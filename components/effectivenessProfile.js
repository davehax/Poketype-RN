import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions, TouchableNativeFeedback, Text } from 'react-native';
import Type, { SmallTypeFlex, SmallTypeFlexImmune, SmallTypeFlexDoubleResist, SmallTypeFlexDoubleVulnerable } from "./type.js";
import types, { typesArray, calculateStrengthsAndWeaknesses } from "../lib/poketype.js";
import Container, { Heading1, Heading2, ContainerPadded, ContainerPaddedVertical } from "./common.js";
import _ from "lodash";

// Still haven't got the hang of the stylesheet in React Native so don't cringe too much
const styles = StyleSheet.create({
    types: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingTop: 15,
        paddingBottom: 5
    },
    typeBorder: {
        borderStyle: "solid",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        borderLeftColor: "#000000",
        borderLeftWidth: 1,
        borderRightColor: "#000000",
        borderRightWidth: 1,
        paddingTop: 5,
        flex: 0,
        height: 5,
        width: "100%"
    },
    typeSubTitle: {
        paddingLeft: 0,
        paddingTop: 10,
        fontSize: 16
    },
    strengths: {
        flex: 1,
        padding: 20,
        minHeight: 100,
        // backgroundColor: "#0E7E12"
        backgroundColor: "rgba(0, 200, 0, 0.5)",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#0E7E12",
        borderBottomColor: "#0E7E12"
    },
    weaknesses: {
        flex: 1,
        padding: 20,
        minHeight: 100,
        // backgroundColor: "#FF0000"
        backgroundColor: "rgba(200, 100, 50, 0.5)",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#FF0000",
        borderBottomColor: "#FF0000"
    }
})

// This is what I call the "Effectiveness Profile"!
// It lists the Strengths and Weaknesses for the selected Type(s)
const EffectivenessProfile = ({ type1, type2 }) => {
    let selectedTypes = _.uniq(
        [type1, type2].filter((t) => t !== types.unselected)
    );

    // Early exit if there are no selected types
    if (selectedTypes.length === 0) {
        return null;
    }

    let effectivenessProfile = calculateStrengthsAndWeaknesses(selectedTypes);

    // Strong Against
    // -- Effective
    // -- Resist & Immune

    // Weak Against
    // -- Not Effective
    // -- Vulnerable

    return (
        <Container>
            {/* Strengths */}
            <View style={styles.strengths}>
                <Heading1>Strengths</Heading1>
                <TypedDisplayPanel
                    title="Effective Against"
                    selectedTypes={selectedTypes}
                    effectivenessProfile={effectivenessProfile}
                    index="effective"
                />
                <View style={{ height: 10 }}></View>
                <SimpleDisplayPanel
                    title="Resistant To"
                    single={effectivenessProfile.combined.resist}
                    double={effectivenessProfile.combined.resistDouble}
                    DoubleComponent={SmallTypeFlexDoubleResist}
                    immune={effectivenessProfile.combined.resistImmune}
                />
            </View>

            {/* Weaknesses */}
            <View style={styles.weaknesses}>
                <Heading1>Weaknesses</Heading1>
                <SimpleDisplayPanel
                    title="Vulnerable To"
                    single={effectivenessProfile.combined.vulnerable}
                    double={effectivenessProfile.combined.vulnerableDouble}
                    DoubleComponent={SmallTypeFlexDoubleVulnerable}
                    immune={[]}
                />
                <View style={{ height: 10 }}></View>
                <TypedDisplayPanel
                    title="Not Effective Against"
                    selectedTypes={selectedTypes}
                    effectivenessProfile={effectivenessProfile}
                    index="notEffective"
                />
            </View>
        </Container>
    )
}

// Displays the single, double and immune type(s) passed in as well as an additional Title
const SimpleDisplayPanel = ({ title, single, double, DoubleComponent, immune }) => {
    return (
        <ContainerPaddedVertical>
            <Heading2>{title}</Heading2>
            <View style={styles.types}>
                {immune.length ? immune.map((t, idx) => <SmallTypeFlexImmune icon={t} key={idx} />) : null}
                {double.length ? double.map((t, idx) => <DoubleComponent icon={t} key={idx} />) : null}
                {single.length ? single.map((t, idx) => <SmallTypeFlex icon={t} key={idx} />) : null}
            </View>
        </ContainerPaddedVertical>
    )
}

// An extension of the SimpleDisplayPanel, this time adding an extra Type sub-title
const TypedDisplayPanel = ({ title, selectedTypes, effectivenessProfile, index }) => {
    return (
        <ContainerPaddedVertical>
            <Heading2>{title}</Heading2>
            {selectedTypes.map((selectedType, idx) => {
                return (
                    <View key={idx}>
                        <View style={styles.types}>
                            {effectivenessProfile[selectedType][index].map((t, idx2) => <SmallTypeFlex icon={t} key={idx2} />)}
                        </View>
                        <View style={styles.typeBorder}></View>
                        <View>
                            <Text style={styles.typeSubTitle}>{selectedType.toUpperCase()}</Text>
                        </View>
                    </View>
                )
            })}
        </ContainerPaddedVertical>
    )
}

export default EffectivenessProfile;