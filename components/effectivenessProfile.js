import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions, TouchableNativeFeedback, Text } from 'react-native';
import Type, { SmallTypeFlex, SmallTypeFlexImmune, SmallTypeFlexDouble } from "./type.js";
import types, { typesArray, calculateStrengthsAndWeaknesses } from "../lib/poketype.js";
import Container, { Heading1, Heading2, ContainerPadded, ContainerPaddedVertical } from "./common.js";
import _ from "lodash";

const styles = StyleSheet.create({
    types: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: 15,
        paddingBottom: 5
    },
    strengths: {
        flex: 1,
        padding: 10,
        minHeight: 100,
        // backgroundColor: "#0E7E12"
        backgroundColor: "rgba(0, 200, 0, 0.5)"
    },
    weaknesses: {
        flex: 1,
        padding: 10,
        minHeight: 100,
        // backgroundColor: "#FF0000"
        backgroundColor: "rgba(200, 100, 50, 0.5)"
    }
})

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
                <SimpleDisplayPanel 
                    title="Resistant To" 
                    single={effectivenessProfile.combined.resist} 
                    double={effectivenessProfile.combined.resistDouble} 
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
                    immune={[]} 
                />
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

const TypedDisplayPanel = ({ title, selectedTypes, effectivenessProfile, index }) => {
    return (
        <ContainerPaddedVertical>
            <Heading2>{title}</Heading2>
            {selectedTypes.map((selectedType) => {
                return (
                    <View style={styles.types}>
                        {effectivenessProfile[selectedType][index].map((t) => <SmallTypeFlex icon={t} />)}
                    </View>
                )
            })}
        </ContainerPaddedVertical>
    )
}

const SimpleDisplayPanel = ({ title, single, double, immune }) => {
    return (
        <ContainerPaddedVertical>
            <Heading2>{title}</Heading2>
            <View style={styles.types}>
                {immune.length ? immune.map((t) => <SmallTypeFlexImmune icon={t} />) : null}
                {double.length ? double.map((t) => <SmallTypeFlexDouble icon={t} />) : null}
                {single.length ? single.map((t) => <SmallTypeFlex icon={t} />) : null}
            </View>
        </ContainerPaddedVertical>
    )
}

export default EffectivenessProfile;