import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { _error, _info, _success, _warning } from "react-color-log";
import diamond from "./assets/img/diamond.png";

// Componente
const App = () => {
  console.log(Platform.OS);

  const [pickerImg, setPickerImg] = useState(null);

  const onPressAlertMsg = () => {
    Alert.alert("Me presionaste");
  };

  const onPressPickImg = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setPickerImg(null);
      Alert.alert("Se necesitan los permisos de la cámara para continuar");
      return;
    }

    const picker = await ImagePicker.launchImageLibraryAsync();
    if (picker.cancelled) {
      return;
    }
    setPickerImg(picker);
  };

  const onPressShareImg = async () => {
    let available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert("La opción de compartir no está disponible!!");
      return;
    }
    await Sharing.shareAsync(pickerImg.uri);
  };

  const width_ = 220;
  const ViewImg = () => {
    return (
      <View style={styles.containerImg}>
        <Image
          source={{ uri: pickerImg.uri }}
          style={{
            width: width_,
            height: width_ * (pickerImg.height / pickerImg.width),
          }}
        />
        <TouchableOpacity style={styles.btnShare} onPress={onPressShareImg}>
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <Text style={styles.title}>Aplicación React Native</Text>
        <Image
          style={styles.image}
          // source={{ uri: "https://picsum.photos/200" }}
          source={diamond}
        />
        <Button onPress={onPressAlertMsg} title="Presioname" color="red" />
      </View>
      <View style={styles.containerDown}>
        <Text style={styles.titlePick}>
          Seleccione una imagen de la galería
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPressPickImg}>
          <Text style={styles.buttonText}>Galería</Text>
        </TouchableOpacity>
        {pickerImg && <ViewImg />}
      </View>
      <StatusBar style="light" />
    </View>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUp: {
    flex: 4,
    backgroundColor: "#20232A",
    alignItems: "center",
    justifyContent: "center",
  },
  containerDown: {
    flex: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerImg: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: "#61DAFB",
    fontWeight: "400",
    marginBottom: 10,
  },
  titlePick: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  image: {
    height: 160,
    width: 160,
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkorchid",
    padding: 10,
    borderRadius: 6,
  },
  btnShare: {
    alignItems: "center",
    backgroundColor: "limegreen",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default App;
