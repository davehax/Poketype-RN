import React, { PureComponent } from "react";
import { StyleSheet, Text } from 'react-native';
import Container from "./common.js";

const styles = StyleSheet.create({
    doubleStrong: {
        color: "#0E7E12",
    },
    doubleWeak: {
        color: "#FF0000",
    },
    immune: {
        color: "#000000",
    }
})

// The "Legend" displayed below the Picker's on the main app screen
class Legend extends PureComponent {
    render() {
        return (
            <Container>
                <Text style={styles.doubleStrong}>■ Double Resist</Text>
                <Text style={styles.doubleWeak}>■ Double Vulnerable</Text>
                <Text style={styles.immune}>■ Immune</Text>
            </Container>
        )
    }
}

export default Legend;