import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import styles from './style';

export default function NewTask({ navigation }) {
    const [status, setStatus] = useState(false);//nome status de entrega
    const [entregas, setEstregas] = useState(0);//cont entregas 0
    const [produto, setProduto] = useState(null);//nome produto
    const [rua, setRua] = useState(null);//rua
    const [bairro, setBairro] = useState(null);//bairoo
    const [numero, setNumero] = useState(null);//numero
    const [cep, setCep] = useState(null);//cep


    // função que vai mandar as informações pro banco do firebase
    const addTask = async () => {
        //Só manda se todos os campos estiverem preenchidos
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
                    entregas: entregas,
                });
            Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!')
            //volta pra pagina de produtos
            navigation.navigate("Produtos")
        }
    }

    return (
        //tela setando as novar informações 
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
