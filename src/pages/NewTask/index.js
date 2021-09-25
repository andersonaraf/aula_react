import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-crop-picker';

import styles from './style';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

import Geolocation from '@react-native-community/geolocation';

export default function NewTask({ navigation }) {
    const [description, setDescription] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transfering, setTransfering] = useState(0);
    const [image, setImage] = useState(null);
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            setLat(info.coords.latitude)
            setLong(info.coords.longitude)
        });
    }, [])
    
    const addTask = async () => {
        if (description != null && image != null) {
            const uploadUri = image.path;
            let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

            setUploading(true)
            setTransfering(0)
            const task = storage().ref(`images/${fileName}`).putFile(uploadUri);
            //INFORMAÇÕES DO ANDAMENTO DO UPLOAD
            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} / ${taskSnapshot.totalBytes}`);
                //SERIA UM PROGESSO DO UPLOAD, MAS ESTOU COM PREGUIÇA
                setTransfering(
                    Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
                );
            });

            try {
                await task;
                setUploading(false)
            } catch (error) {
                console.log(error);
            }

            firestore()
                .collection('tasks')
                .add({
                    description: description,
                    delivery_status: false,
                    image: fileName,
                    lat: lat,
                    long: long
                });
            Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!')
            setImage(null);
            navigation.navigate("Produtos")
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
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.input} onChangeText={setDescription} value={description} placeholder="Ex: Estudar js" />

            <Text style={styles.label}>Imagem</Text>
            <ImageBackground source={{ uri: image != null ? image.path : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/300px-React-icon.svg.png" }} style={styles.image}>
            </ImageBackground>

            <TouchableOpacity style={styles.addImage} onPress={takePhotoFromCamera}>
                <Text style={styles.textImage}>Alterar Imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonNewTask} onPress={() => { addTask() }}>
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}
