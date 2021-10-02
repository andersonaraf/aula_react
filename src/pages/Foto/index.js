import React, { useEffect, useState } from 'react';
import { Text,
  Alert,
  Modal,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './style';
import { RNCamera } from "react-native-camera";
import firestore from '@react-native-firebase/firestore';

const Camera = ({ isVisible, onChangePhoto, onCloseCamera }) => {
  const [camera, setCamera] = useState();
  const onTakePicture = async () => {
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        skipProcessing: true
      });
      onChangePhoto(uri);
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao tirar a foto.");
    }
  };
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <RNCamera
        ref={ref => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: "Permissão para usar a câmera",
          message: "Precisamos da sua permissão para usar a câmera.",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar"
        }}
        captureAudio={false}
      >
        <Icon
          name="photo-camera"
          size={40}
          color={"#fff"}
          onPress={onTakePicture}
          style={styles.buttonTakePicture}
        />
        <Icon
          name="close"
          size={50}
          color={"#fff"}
          onPress={onCloseCamera}
          style={styles.buttonCloseCamera}
        />
      </RNCamera>
    </Modal>
  );
};


export default function Foto({navigation}) {
  const [orderStatus, setOrderStatus] = useState('recebido');
  const [status, setStatus] = useState(true);//nome status de entrega

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const onChangePhoto = newPhoto => {
    setPhoto(newPhoto);
    setIsCameraVisible(false);
  };
  const onCloseCamera = () => {
    setIsCameraVisible(false);
  };
  const handleNotifOpen = (remoteMessage) => {
    if (remoteMessage) {
      if (remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    }
  }

  const saveFoto = () =>{
    firestore()
                .collection('tasks')
                .add({
                    foto: photo,
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

      <View style={styles.photo}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsCameraVisible(true);
          }}
        >
          <Icon name="camera-alt" size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setPhoto(null);
          }}
        >
          <Icon name="delete" size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveFoto();
          }}
        >
          <Icon name="check" size={40} color={"white"} />
        </TouchableOpacity>

      </View>

      <Camera
        isVisible={isCameraVisible}
        onChangePhoto={onChangePhoto}
        onCloseCamera={onCloseCamera}
      />
    </View>
  );
}
