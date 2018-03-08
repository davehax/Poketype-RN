import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

let icons = {};
icons["unselected"] = require('../img/questionmark.png');
icons["bug"] = require('../img/type-bug.png');
icons["dark"] = require('../img/type-dark.png');
icons["dragon"] = require('../img/type-dragon.png');
icons["electric"] = require('../img/type-electric.png');
icons["fairy"] = require('../img/type-fairy.png');
icons["fighting"] = require('../img/type-fighting.png');
icons["fire"] = require('../img/type-fire.png');
icons["flying"] = require('../img/type-flying.png');
icons["ghost"] = require('../img/type-ghost.png');
icons["grass"] = require('../img/type-grass.png');
icons["ground"] = require('../img/type-ground.png');
icons["ice"] = require('../img/type-ice.png');
icons["normal"] = require('../img/type-normal.png');
icons["poison"] = require('../img/type-poison.png');
icons["psychic"] = require('../img/type-psychic.png');
icons["rock"] = require('../img/type-rock.png');
icons["steel"] = require('../img/type-steel.png');
icons["water"] = require('../img/type-water.png');

const Type = ({ style, icon, onPress, titleOverride }) => {
    let text = titleOverride || icon.toUpperCase();
    onPress = onPress || function() {};

    return (
        <View>
            <Image source={icons[icon]} />
            <Text>{text}</Text>
        </View>
    )
}

export default Type;