import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

import styles from "./style"

export default function Details({ navigation, route }) {
    const [produtoEdit, setProdutoEdit] = useState(route.params.produto);
    const [rua, setRua] = useState(route.params.rua);//rua
    const [bairro, setBairro] = useState(route.params.bairro);//bairoo
    const [numero, setNumero] = useState(route.params.numero);//numero
    const [cep, setCep] = useState(route.params.endereco);//cep
    const idTask = route.params.id;

    async function editTask(produto, id) {
        if (produto.length > 0) {
            firestore().collection('tasks').doc(id).update({
                produto: produto,
                rua: rua,
                bairro: bairro,
                numero: numero,
                cep: cep,
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
            <TextInput style={styles.input} onChangeText={setProdutoEdit} value={produtoEdit} placeholder="Ex: Estudar js" />

            <Text style={styles.label}>Endereço: </Text>
            <TextInput style={styles.input} onChangeText={setRua} value={rua} placeholder="Rua" />
            <TextInput style={styles.input} onChangeText={setBairro} value={bairro} placeholder="Bairro" />
            <TextInput style={styles.input} onChangeText={setNumero} value={numero} placeholder="124" />
            <TextInput style={styles.input} onChangeText={setCep} value={cep} placeholder="69915-840" />
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
