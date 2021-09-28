import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './style';

export default function Delivery(){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttom} >
                <Text style={styles.text} >Entrega iniciada!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} >
                <Text style={styles.text} >Entregador a caminho!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} >
                <Text style={styles.text} >Entregador chegou! </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttom} >
                <Text style={styles.text} >Entrega realizada!</Text>
            </TouchableOpacity>
        </View>
    );
}

