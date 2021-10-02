import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import mapMarkerIcon from '../../images/mapMarkerIcon.png';
import Geolocation from '@react-native-community/geolocation';

import { getLatLong } from '../../api/cepaberto';

import styles from './style';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-crop-picker';

export default function Delivery({ navigation, route }) {

  //1 - PEdido aceito / 2 - Pagamento Confirmado / 3 - Em separacao / 4 - Enviado / 5 - Recebido
  const [orderStatus, setOrderStatus] = useState('aceito');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latDestino, setLatDestino] = useState(0);
  const [longDestino, setLongDestino] = useState(0);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCgC-BOjUwUhiIlVNYvskzqyqzSLNDiZSY'

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTwo, setIsLoadingTwo] = useState(true);

  const idProduct = route.params.item.id;
  const [image, setImage] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transfering, setTransfering] = useState(0);

  // CARREGAR LOCALIZAÇÃO ATUAL DINAMICAMENTE
  async function loadLocation() {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        setLatitude(parseFloat(latitude));
        setLongitude(parseFloat(longitude));
        setIsLoading(false);
      },
      (error) => {
        console.log(error.code, 'Erro: ' + error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 3600000 }
    );

  }

  async function loadLocationAwait() {
    await loadLocation();
  }

  //abre o app apos clicar na notificacao
  const handleNotifOpen = (remoteMessage) => {
    if (remoteMessage) {
      if (remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    }
  }

  useEffect(() => {
    loadLocationAwait();
  }, []);

  useEffect(() => {
    getDestinyLatLong();
  }, []);

  useEffect(() => {
    //Pedindo permissao de notificacao
    const requestNotifPermission = async () => {
      const authStatus = await messaging().requestPermission();
    }
    requestNotifPermission();
    //Pega o Token do telefone
    messaging().getToken().then((token) => {

    })

    //recebendo notificacao foregorund (com o App aberto)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("recebido no foreground", remoteMessage);
      //verifica se existe dados na msg
      if (remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    });
    //Envento em notificacao em background e o user clica na notificacao - minimizado
    messaging().onNotificationOpenedApp(handleNotifOpen);

    //Evento para notificar se estiver totalmente fechado
    messaging().getInitialNotification().then(handleNotifOpen);

    return unsubscribe;
  }, []);
  
  async function getDestinyLatLong() {
    setIsLoadingTwo(true);
    const response = await getLatLong(route.params.item.cep);
    setLatDestino(parseFloat(response.latitude));
    setLongDestino(parseFloat(response.longitude));
    setIsLoadingTwo(false);
  }

  //ALERT PADRÃO DO APP, ESTUDA
  const dialogFinish = () => {
    Alert.alert(
      "Finalizar Entrega",
      "Deseja Finalizar a entrega.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Finalizar", onPress: () => {
            firestore().collection('tasks').doc(idProduct).update({
              imagePeopleReceiver: imagePath,
              status: true,
            });
            //REDIRECIONA PARA TELA DE PRODUTOS
            navigation.navigate("Produtos")
          }
        }
      ]
    );
  }

  //FUNCAO REALIZAR UPLOAD DE IMAGES
  const finish = async () => {
    const uploadUri = image.path;
    //PEGA SOMENTE O NOME DO ARQUIVO
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    //SALVA O NOME DO ARQUIVO PARA SETAR NO BANCO
    setImagePath(fileName);
    setUploading(true)
    setTransfering(0)
    //CRIAR UM REFERENCIA PARA O STORAGE
    const task = storage().ref(`images/${fileName}`).putFile(uploadUri);
    //REALIZAR A TRANSFERIANCIA MOSTRANDO O PROGRESS DE ENVIO
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} / ${taskSnapshot.totalBytes}`);
      //SERIA UM PROGESSO DO UPLOAD, MAS ESTOU COM PREGUIÇA
      setTransfering(
        //MATEMATICA ESTUDA 
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      );
    });
    try {
      await task;
      dialogFinish();
    } catch (e) {
      console.log(e);
    }
  }

  //ABRE A CAMERA E SALVA A IMAGEM NA VARIAVEL
  //ESSA IMAGEM ESTA NA PASTA TEMPORARIA DO CELULAR
  async function takePhotoFromCamera() {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
    }).then(image => {
      setImage(image);
      finish();
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerStatus} >
        <Text style={styles.text}>
          {orderStatus == 'aceito' && 'Seu pedido foi aceito!'}
          {orderStatus == 'confirmado' && 'Seu pedido foi confirmado!'}
          {orderStatus == 'separado' && 'Seu pedido foi separado!'}
          {orderStatus == 'enviado' && 'Seu pedido foi enviado!'}
          {orderStatus == 'recebido' && 'Seu pedido foi recebido!'}
        </Text>
      </View>

      {/*
              Add map aqui
              Latitude e longitude é o local definido como padrão;
              Os Deltas é o zoom aplicado ao mapa por padrao;
              PROVIDER determina que tipo de mapa vai ser usado tanto no iOS quando no Android,
              no caso fica setado como padrao o Google Maps nos dois casos.
              isLoadingTwo é carraegado após o carregamento da latitude e longitude do destino que e retornado pela api do cepaberto
            */}
      {isLoading ? (<Text>Carregando...</Text>) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,

            }}
            zoomEnabled={true}
            maxZoomLevel={13}
          >
            {/*Caso tenha api directions do google pode utilziar para traçar rotas */}
            {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          /> */}
            {isLoading == true ? (<></>) : (
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              />
            )}
            {/* MARCADOR DE DESTINO*/}
            {isLoadingTwo == true ? (<></>) : (
              <Marker
                icon={mapMarkerIcon}
                coordinate={{
                  latitude: latDestino,
                  longitude: longDestino,
                }}
                title="Local de Entrega"
                description="Local de Entrega"
              />
            )}
          </MapView>
        </>
      )}
      <ScrollView style={styles.containerScroll}>
        <Text style={styles.produto}>Produto: {route.params.item.produto}</Text>
        <Text style={styles.produto}>Rua: {route.params.item.rua}</Text>
        <Text style={styles.produto}>Número: {route.params.item.numero}</Text>
        <Text style={styles.produto}>Bairro: {route.params.item.bairro}</Text>


        <TouchableOpacity style={styles.buttonFinish} onPress={takePhotoFromCamera}>
          <Text style={styles.textButtonFinish}>Finalizar Entrega</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

