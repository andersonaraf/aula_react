import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

import styles from "./style"

export default function Details({ navigation, route }) {
    const [produtoEdit, setProdutoEdit] = useState(route.params.produto);
    const idTask = route.params.id;

    async function editTask(produto, id) {
        if (produto.length > 0) {
            firestore().collection('tasks').doc(id).update({
                produto: produto,
            });
            navigation.navigate('Produtos');
        }

    }

    function takePhotoFromCamera() {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true,
        }).then(image => {
            setImage(image);
        });
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Produto: </Text>
            <TextInput style={styles.input} onChangeText={setProdutoEdit} value={produto} placeholder="Ex: Estudar js" />

            <Text style={styles.label}>Endereço: </Text>
            <TextInput style={styles.input} placeholder="Rua" />
            <TextInput style={styles.input} placeholder="Bairro" />
            <TextInput style={styles.input} placeholder="Número" />

            {/* <MapView style={styles.map} initialRegion={{
                latitude: latRoute,
                longitude: longRoute,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker
                    coordinate={{ latitude: latRoute, longitude: longRoute }}
                    image={{ uri: 'https://img.icons8.com/color/48/000000/marker.png' }}
                />
            </MapView> */}

            <TouchableOpacity style={styles.addImage} onPress={() => { editTask(descriptionEdit, idTask) }}>
                <Text style={styles.textImage}>SALVAR</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
