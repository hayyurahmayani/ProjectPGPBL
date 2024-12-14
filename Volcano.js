import React from "react";
import Datavolcano from './data/volcano.json';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVolcano } from "@fortawesome/free-solid-svg-icons";

const Volcano = () => {
    // Fungsi untuk menentukan warna status
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "danger":
                return "darkred";
            case "alert":
                return "orangered";
            case "standby":
                return "orange";
            case "normal":
                return "green";
            default:
                return "black"; // Default warna jika tidak cocok
        }
    };

    return (
        <FlatList style={styles.container}
            data={Datavolcano}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.avatar}>
                        <FontAwesomeIcon icon={faVolcano} size={50} color="#412416" />
                    </View>
                    <View>
                        <Text style={styles.cardtitle}>{item.name}</Text>
                        <Text>{item.location}</Text>
                        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                            {item.status}
                        </Text>
                    </View>
                </View>
            )}
        />
    );
};

export default Volcano;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf0', // Ubah warna latar belakang
    },
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a7b92f',
        backgroundColor: '#f8f8ff',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7,
    },
    status: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
