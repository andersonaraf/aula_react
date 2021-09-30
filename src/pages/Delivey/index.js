import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarkerIcon from '../../images/mapMarkerIcon.png';

import styles from './style';

export default function Delivery(){
     //1 - PEdido aceito / 2 - Pagamento Confirmado / 3 - Em separacao / 4 - Enviado / 5 - Recebido
  const [orderStatus, setOrderStatus] = useState('aceito');

  //abre o app apos clicar na notificacao
  const handleNotifOpen = (remoteMessage) => {
    if (remoteMessage) {
      if (remoteMessage.data.newStatus){
        setOrderStatus(remoteMessage.data.newStatus);
      }
    }
  }

  useEffect(() => {
    //Pedindo permissao de notificacao
    const requestNotifPermission = async() => {
      const authStatus = await messaging().requestPermission();
    }
    requestNotifPermission();
    //Pega o Token do telefone
    messaging().getToken().then((token) => {

    })

    //recebendo notificacao foregorund (com o App aberto)
    const unsubscribe = messaging().onMessage(async(remoteMessage) => {
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

    return(
        <View style={styles.container}>
            <View style={styles.containerStatus} >
              <Text style={styles.text}>
                { orderStatus == 'aceito' && 'Seu pedido foi aceito!'}
                { orderStatus == 'confirmado' && 'Seu pedido foi confirmado!'}
                { orderStatus == 'separado' && 'Seu pedido foi separado!'}
                { orderStatus == 'enviado' && 'Seu pedido foi enviado!'}
                { orderStatus == 'recebido' && 'Seu pedido foi recebido!'}
              </Text>
            </View>

            {/*
              Add map aqui
              Latitude e longitude é o local definido como padrão;
              Os Deltas é o zoom aplicado ao mapa por padrao;
              PROVIDER determina que tipo de mapa vai ser usado tanto no iOS quando no Android,
              no caso fica setado como padrao o Google Maps nos dois casos.
            */}

            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: -9.931208,
                longitude: -67.817902,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }}
            >
              {/* Marker cria o marcador do local no mapa */}
              <Marker
                icon={mapMarkerIcon}
                coordinate={{
                  latitude: -9.931208,
                  longitude: -67.817902,
                }}
              >
              </Marker>
            </MapView>


        </View>
    );
}

