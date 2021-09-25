import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-crop-picker';

import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

import Geolocation from '@react-native-community/geolocation';

import styles from "./style"
import MapView, {Marker} from 'react-native-maps';

export default function Details({ navigation, route }) {
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description);
    const idTask = route.params.id;
    const latRoute = route.params.lat;
    const longRoute = route.params.long;
    const [urlImage, setUrlImage] = useState(route.params.urlImage);
    const [image, setImage] = useState(null);
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)


    useEffect(async () => {
        const url = await storage().ref(`images/${route.params.urlImage}`).getDownloadURL();
        setUrlImage(url);
    }, [])

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            setLat(info.coords.latitude)
            setLong(info.coords.longitude)
        });
    }, [])

    async function editTask(description, id) {
        if (description.length > 0) {
            if (image != null) {
                const uploadUri = image.path;
                let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                const task = storage().ref(`images/${fileName}`).putFile(uploadUri);
                try {
                    await task;
                } catch (error) {
                    console.log(error);
                }

                firestore().collection('tasks').doc(id).update({
                    description: description,
                    image: fileName,
                    lat: lat,
                    long: long
                });
            }
            else {
                firestore().collection('tasks').doc(id).update({
                    description: description,
                    lat: lat,
                    long: long
                });
            }
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
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input} onChangeText={setDescriptionEdit} value={descriptionEdit} placeholder="Ex: Estudar js" />

            <Text style={styles.label}>Imagem</Text>
            <ImageBackground source={{ uri: image != null ? image.path : urlImage }} style={styles.image}>
            </ImageBackground>

            <MapView style={styles.map} initialRegion={{
                latitude: latRoute,
                longitude: longRoute,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
                <Marker
                    coordinate={{ latitude: latRoute, longitude: longRoute }}
                    image={{ uri: 'https://img.icons8.com/color/48/000000/marker.png' }}
                />
            </MapView>

            <TouchableOpacity style={styles.addImage} onPress={takePhotoFromCamera}>
                <Text style={styles.textImage}>Adicionar Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonNewTask} onPress={() => { editTask(descriptionEdit, idTask) }}>
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
