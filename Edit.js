import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';

const Edit = ({ route, navigation }) => {
    const { sectionIndex, itemIndex, currentPokemon } = route.params;
    const [name, setName] = useState(currentPokemon.key);
    const [itemNo, setItemNo] = useState(currentPokemon.itemNo);

    const handleSave = () => {
        if (name && itemNo) {
            datasource[sectionIndex].data[itemIndex] = { key: name, itemNo };
            Alert.alert("Success", "Pokemon updated successfully!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Error", "Please provide valid inputs.");
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Pokémon",
            `Are you sure you want to delete ${currentPokemon.key}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes, Delete",
                    onPress: () => handleDelete(),
                    style: "destructive",
                },
            ]
        );
    };


    const handleDelete = () => {
        datasource[sectionIndex].data.splice(itemIndex, 1);
        Alert.alert("Success", `${currentPokemon.key} deleted successfully!`);
        navigation.navigate("Home");
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Pokemon Id:</Text>
            <TextInput
                style={styles.input}
                value={itemNo}
                onChangeText={setItemNo}
            />
            <View style={styles.buttonRow}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={confirmDelete} color='red' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 20, borderRadius: 5 },
    buttonRow: { flexDirection: "row", justifyContent: "space-between" },
});

export default Edit;
