import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    button: { margin: 10, padding: 10 },
    opacityStyle: {
        borderWidth: 1,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgray',
    },
    textStyle: { fontSize: 15, margin: 10, textAlign: 'left' },
    headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    headerText: { fontSize: 20, marginLeft: 10, fontWeight: 'bold', color: '#000' },
    imageStyle: { width: 250, height: 300, margin: 10 },
});

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
                navigation.navigate("Edit", {
                    sectionIndex: datasource.indexOf(section),
                    itemIndex: index,
                    currentPokemon: item,
                })
            }
        >
            <Text style={styles.textStyle}>{item.key}</Text>
            <Image source={{ uri: `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.itemNo}-2x.png` }} style={styles.imageStyle} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Add Pokemon" onPress={() => navigation.navigate("Add")} />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgColor, iconColor, iconName } }) => (
                    <View style={[styles.headerContainer, { backgroundColor: bgColor }]}>
                        <Icon name={iconName} size={20} color={iconColor} />
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.key}
            />
        </View>
    );
};

export default Home;
