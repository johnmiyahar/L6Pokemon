import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data.js';
import { Picker } from '@react-native-picker/picker';

const Add = ({ navigation }) => {
    const [name, setName] = useState("");
    const [itemNo, setItemNo] = useState("");
    const [type, setType] = useState("GRASS");

    const handleSubmit = () => {
        if (name && itemNo) {
            const sectionIndex = datasource.findIndex((section) => section.title === type);
            datasource[sectionIndex].data.push({ key: name, itemNo });

            Alert.alert("Success", `Added ${name} to ${type}!`);
            navigation.navigate("Home");
        } else {
            Alert.alert("Error", "Please provide valid inputs.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokemon Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Pokemon name"
            />
            <Text style={styles.label}>Pokemon ID:</Text>
            <TextInput
                style={styles.input}
                value={itemNo}
                onChangeText={setItemNo}
                placeholder="Enter Pokemon ID"
            />
            <Text style={styles.label}>Type:</Text>
            <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
                {datasource.map((section) => (
                    <Picker.Item key={section.title} label={section.title} value={section.title} />
                ))}
            </Picker>
            <Button title="Add Pokemon" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 20, borderRadius: 5 },
    picker: { height: 50, width: "100%", marginBottom: 20 },
});

export default Add;
