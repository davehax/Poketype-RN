import _ from "lodash";

// types enum
const types = {
    unselected: "unselected",
    bug: "bug",
    dark: "dark",
    dragon: "dragon",
    electric: "electric",
    fairy: "fairy",
    fighting: "fighting",
    fire: "fire",
    flying: "flying",
    ghost: "ghost",
    grass: "grass",
    ground: "ground",
    ice: "ice",
    normal: "normal",
    poison: "poison",
    psychic: "psychic",
    rock: "rock",
    steel: "steel",
    water: "water"
}

const typesArray = (function() {
    let tArray = [];
    for (let t in types) {
        if (types.hasOwnProperty(t)) {
            tArray.push(t);
        }
    }
    return tArray;
})();

// Partial effectiveness profile that will be completed in the loop immediately below
let effectiveness = {
    "bug": {
        "effective": [types.dark, types.grass, types.psychic],
        "resist": [types.fighting, types.grass, types.ground],
        "immune": []
    },

    "dark": {
        "effective": [types.ghost, types.psychic],
        "resist": [types.dark, types.ghost],
        "immune": [types.psychic]
    },

    "dragon": {
        "effective": [types.dragon],
        "resist": [types.electric, types.fire, types.grass, types.water],
        "immune": []
    },

    "electric": {
        "effective": [types.flying, types.water],
        "resist": [types.electric, types.flying, types.steel],
        "immune": []
    },

    "fairy": {
        "effective": [types.dark, types.dragon, types.fighting],
        "resist": [types.bug, types.dark, types.fighting],
        "immune": [types.dragon]
    },

    "fighting": {
        "effective": [types.dark, types.ice, types.normal, types.rock, types.steel],
        "resist": [types.bug, types.dark, types.rock],
        "immune": []
    },

    "fire": {
        "effective": [types.bug, types.grass, types.ice, types.steel],
        "resist": [types.bug, types.fairy, types.fire, types.grass, types.ice, types.steel],
        "immune": []
    },

    "flying": {
        "effective": [types.bug, types.fighting, types.grass],
        "resist": [types.bug, types.fighting, types.grass],
        "immune": [types.ground]
    },

    "ghost": {
        "effective": [types.ghost, types.psychic],
        "resist": [types.bug, types.poison],
        "immune": [types.fighting, types.normal]
    },

    "grass": {
        "effective": [types.ground, types.rock, types.water],
        "resist": [types.electric, types.grass, types.ground, types.water],
        "immune": []
    },

    "ground": {
        "effective": [types.electric, types.fire, types.poison, types.rock, types.steel],
        "resist": [types.poison, types.rock],
        "immune": [types.electric]
    },

    "ice": {
        "effective": [types.dragon, types.flying, types.grass, types.ground],
        "resist": [types.ice],
        "immune": []
    },

    "normal": {
        "effective": [],
        "resist": [],
        "immune": [types.ghost]
    },
    
    "poison": {
        "effective": [types.fairy, types.grass],
        "resist": [types.bug, types.fairy, types.fighting, types.grass, types.poison],
        "immune": [""]
    },

    "psychic": {
        "effective": [types.fighting, types.poison],
        "resist": [types.fighting, types.psychic],
        "immune": []
    },

    "rock": {
        "effective": [types.bug, types.fire, types.flying, types.ice],
        "resist": [types.fire, types.flying, types.normal, types.poison],
        "immune": []
    },

    "steel": {
        "effective": [types.fairy, types.ice, types.rock],
        "resist": [types.bug, types.dragon, types.fairy, types.flying, types.grass, types.ice, types.normal, types.psychic, types.rock, types.steel],
        "immune": [types.poison]
    },

    "water": {
        "effective": [types.fire, types.ground, types.rock],
        "resist": [types.fire, types.ice, types.steel, types.water],
        "immune": []
    }
}

// extend effectiveness
for (let i in effectiveness) {
    if (effectiveness.hasOwnProperty(i)) {

        // build not effective, not effective immune, and vulnerable properties
        effectiveness[i].notEffective = [];
        effectiveness[i].notEffectiveImmune = [];
        effectiveness[i].vulnerable = [];

        for (let j in effectiveness) {
            if (effectiveness.hasOwnProperty(j) && i !== j) {

                if (effectiveness[j].resist.indexOf(i) !== -1) { effectiveness[i].notEffective.push(j) }
                if (effectiveness[j].immune.indexOf(i) !== -1) { effectiveness[i].notEffectiveImmune.push(j) }
                if (effectiveness[j].effective.indexOf(i) !== -1) { effectiveness[i].vulnerable.push(j) }

            }
        }

    }
}

// Perform POKEMAN calcumalations
const calculateStrengthsAndWeaknesses = (selectedTypes) => {
    // force distinct values for selected types
    selectedTypes = _.uniq(selectedTypes);

    // Array vars so they can be passed by-reference to functions
    let resist = [];
    let resistImmune = [];
    let vulnerable = [];

    // define our return object to be filled in this function
    let effectivenessProfile = {
        combined: {
            resist: [],
            resistImmune: [],
            vulnerable: [],

            // doubles
            resistDouble: [],
            vulnerableDouble: []
        }
    }

    // Combine resist, vulnerable and immune
    selectedTypes.forEach((t) => {
        let typeInfo = effectiveness[t];
        
        resist = resist.concat(typeInfo.resist);
        vulnerable = vulnerable.concat(typeInfo.vulnerable);
        resistImmune = resistImmune.concat(typeInfo.immune);

        effectivenessProfile[t] = typeInfo;
    });

    // vulnerable and immune combine to become resist
    let intersect1 = stripIntersectionFromArrays(vulnerable, resistImmune);
    vulnerable = intersect1.arguments[0];
    resistImmune = intersect1.arguments[1];
    resist = resist.concat(intersect1.intersection);

    // resist and vulnerable cancel each other out
    let intersect2 = stripIntersectionFromArrays(resist, vulnerable);
    resist = intersect2.arguments[0];
    vulnerable = intersect2.arguments[1];

    // extract duplicates from resist and vulnerable and store in a new array
    effectivenessProfile.combined.resistDouble = resist.reduce(getDuplicatesReducer, []);
    effectivenessProfile.combined.vulnerableDouble = vulnerable.reduce(getDuplicatesReducer, []);

    // Get only distinct values for resist and vulnerable
    // And then filter out items that appear in the double arrays
    resist = _.uniq(resist).filter((t) => effectivenessProfile.combined.resistDouble.indexOf(t) === -1);
    vulnerable = _.uniq(vulnerable).filter((t) => effectivenessProfile.combined.vulnerableDouble.indexOf(t) === -1);

    effectivenessProfile.combined.resist = resist;
    effectivenessProfile.combined.resistImmune = resistImmune;
    effectivenessProfile.combined.vulnerable = vulnerable;

    // Sort the arrays in the combined object alphabetically ascending
    for (let key in effectivenessProfile.combined) {
        if (effectivenessProfile.combined.hasOwnProperty(key)) {
            effectivenessProfile.combined[key] = effectivenessProfile.combined[key].sort(sortAlphabeticallyAsc);
        }
    }

    return effectivenessProfile;
}

/************************************************************** */
/************************************************************** */
/************************************************************** */
/************************************************************** */
/************************************************************** */
/** Utility Functions */
/************************************************************** */

// Reduce an array to include only duplicate entries
// adapted from https://stackoverflow.com/a/35922651
// to use: 
// myArray.reduce(getDuplicatesReducer, [])
// e.g. [1,1,2,3,3,3,4,5].reduce(getDuplicatesReducer, []) --> [1,3]
const getDuplicatesReducer = (accumulator, element, idx, arr) => {
    // First, check that the .indexOf() function returns an index not equal to the index of the current element
    // Then check that the element is not already in the accumulator array
	if (arr.indexOf(element) !== idx && accumulator.indexOf(element) < 0) {
        accumulator.push(element);
    }
    return accumulator;
}

// Lexical sort funcs
const sortAlphabeticallyAsc = (a, b) => { return a.localeCompare(b); }
const sortAlphabeticallyDesc = (a, b) => { return a.localeCompare(b); }

// WARNING: Will potentially mutate the arrays passed in
// This function returns the Intersection of all arrays passed in as a single array, 
// as well as removing the intersection elements from all arrays passed in and returning them as well.
// 
// Returns an object {
//      arguments: [array1, array2, ..., arrayN], -- these arrays are in the order that they were passed in as arguments
//      intersection: [item1, item2, ..., itemN]   
// }
const stripIntersectionFromArrays = (...arrays) => {
    let intersection = [];

    // we need a copy of each array first
    let clones = [];
    arrays.forEach((arr) => {
        clones.push(_.clone(arr));
    });

    // Loop through each array passed in
    for (let i = 0; i < arrays.length; i++) {
        // Loop through each cloned array
        for (let j = 0; j < clones.length; j++) {
            // If we aren't comparing the same array to itself then
            if (i !== j) {
                // For all elements in arrays[i]
                arrays[i] = arrays[i].filter((e) => {
                    // If the element occurs in clones[j]
                    if (clones[j].indexOf(e) !== -1) {
                        // Push the element on to the intersection array
                        intersection.push(e);
                        // And remove the element from arrays[i] by returning false
                        return false;
                    }
                    else {
                        // Keep the element if it doesn't occur in clones[j]
                        return true;
                    }
                })
            }
        }
    }

    return {
        intersection: intersection,
        arguments: arrays
    }
}

// Exports
export default types;
export {
    typesArray,
    effectiveness,
    calculateStrengthsAndWeaknesses
}