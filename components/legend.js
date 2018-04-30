import React, { PureComponent } from "react";
import { StyleSheet, Text } from 'react-native';
import Container, { CommonStyles } from "./common.js";
import _ from "lodash";

const styles = StyleSheet.create({
    doubleStrong: _.assignIn({}, CommonStyles.text, {
        color: "#0E7E12",
    }),
    doubleWeak:  _.assignIn({}, CommonStyles.text, {
        color: "#FF0000",
    }),
    immune:  _.assignIn({}, CommonStyles.text, {
        color: "#000000",
    })
});

console.log(styles.doubleStrong);
console.log(styles.doubleWeak);

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