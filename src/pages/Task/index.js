import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import styles from "./style"
import { alignSelf } from 'styled-system';

export default function Task({ navigation }) {
    const [task, setTask] = useState([]);

    function deleteTask(id) {
        firestore().collection('tasks').doc(id).delete()
    }

    useEffect(() => {
        const taskCollection = firestore().collection('tasks').onSnapshot(querySnapshot => {
            const task = [];
            querySnapshot.forEach(doc => {
                task.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setTask(task);
        });
        // console.log(task);
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={(item) => {
                    return (
                        <View style={styles.Task}>
                            <TouchableOpacity style={styles.deleteTask} onPress={() => { deleteTask(item.item.id) }}>
                               <Text style={styles.textDelete}>Deletar</Text>
                            </TouchableOpacity>
                            <Text style={styles.DescriptionTask} onPress={() => { navigation.navigate("Detalhes", { id: item.item.id, description: item.item.description, urlImage: item.item.image, lat: item.item.lat, long: item.item.long}) }}>{item.item.description}</Text>
                            <TouchableOpacity 
                                style={styles.deliveryButtom}
                                onPress={() => { navigation.navigate("Entrega")}}
                            > 
                                <Text>Entregar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <TouchableOpacity style={styles.buttonNewTask} onPress={() => navigation.navigate("Novo Produto")}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )

}
