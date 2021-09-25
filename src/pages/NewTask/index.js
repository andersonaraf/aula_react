import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-crop-picker';

import styles from './style';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

import Geolocation from '@react-native-community/geolocation';

export default function NewTask({ navigation }) {
    const [status, setStatus] = useState(false);//nome status de entrega
    const [entregas, setEstregas] = useState(0);//cont entregas 0
    const [produto, setProduto] = useState(null);//nome produto
    const [rua, setRua] = useState(null);//rua
    const [bairro, setBairro] = useState(null);//bairoo
    const [numero, setNumero] = useState(null);//numero
    const [cep, setCep] = useState(null);//cep
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition((info) => {
            setLat(info.coords.latitude)
            setLong(info.coords.longitude)
        
        });
    }, [])
    
    const addTask = async () => {
        if (produto != null && rua != null && bairro != null && numero != null && cep != null) {

            firestore()
                .collection('tasks')
                .add({
                    produto: produto,
                    rua: rua,
                    bairro: bairro,
                    numero: numero,
                    cep: cep,
                    status: status,
                    lat: lat,
                    long: long,
                    entregas: entregas,
                });
            Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!')
            navigation.navigate("Produtos")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Produto</Text>
            <TextInput style={styles.input} value={produto} onChangeText={r => setProduto(r)} placeholder="Ex: Produto" />
            
            <Text style={styles.label }>Endereço</Text>
            <Text style={styles.label}>Rua</Text>
            <TextInput style={styles.input}  value={rua}  onChangeText={r => setRua(r)}/>
           
            <Text style={styles.label}>Bairro</Text>
            <TextInput style={styles.input}  value={bairro}  onChangeText={b => setBairro(b)}/>

            <Text style={styles.label}>Numero</Text>
            <TextInput style={styles.input}  value={numero} onChangeText={n => setNumero(n)} />
            
            <Text style={styles.label}>CEP</Text>
            <TextInput style={styles.input}  value={cep}  onChangeText={c => setCep(c)}/>

            <TouchableOpacity style={styles.buttonNewTask} onPress={() => { addTask() }}>
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}
