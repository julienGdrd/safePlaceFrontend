import {
    Button,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useDispatch } from "react-redux";
import { addSelfie } from "../../../reducers/selfie";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

import AppLoading  from 'expo-app-loading';
import { useFonts } from '@use-expo/font';

export default function CNIRecto({ navigation }) {

    const fetchUrl = "https://safeplace-backend.vercel.app";

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);
    
    let cameraRef: any = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({
            quality: 0.3,
            exif: false,
            skipProcessing: true,
        });
        console.log('onpress ok');

    const formData: any = new FormData();
    
    
    
    console.log("uri", photo.uri);

    formData.append("photoFromFront", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpeg",
    });
    console.log('formdata ok');
    fetch(`http://192.168.42.89:3000/upload`, {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('test CNI recto');
        if (data.result) {
            data.result && dispatch(addSelfie(data.url));
            navigation.navigate('CNIVerso');
        }
    });
    };
    
    const [isLoaded] = useFonts({
        'OpenSans': require("../../../assets/OpenSans/OpenSans-Regular.ttf"),
        'Raleway': require('../../../assets/Raleway/static/Raleway-Regular.ttf')
        });
    if (!hasPermission || !isFocused || !isLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.container}>
            <View style={styles.topContent}>
                <View style={styles.header}>
                    <FontAwesome
                        name="arrow-left"
                        size={25}
                        color="#33355C"
                        onPress={() => navigation.navigate("Upload")}
                    />
                    <Text style={styles.title}>Welcome to Safe Place</Text>
                </View>
                <Text style={styles.instructions}>
                Prends une photo lisible du recto de ta pièce d'identité pour qu'elle soit vérifiée:
                </Text>
                <Text style={styles.explanations}>
                Ensuite tu prendras la photo du verso
                </Text>
                <Text style={styles.explanations}>
                Merci d'attendre d'être redirigé.e...
                </Text>
            </View>

            <Camera
                type={type}
                flashMode={flashMode}
                ref={(ref: any) => (cameraRef = ref)}
                style={styles.camera}
                autoFocus={true}
            >
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() =>
                        setType(type === CameraType.front ? CameraType.back : CameraType.front)
                        }
                        style={styles.flashButton}
                    >
                        <FontAwesome name="rotate-right" size={25} color="#ffffff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                        setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)
                        }
                        style={styles.flashButton}
                    >
                        <FontAwesome
                            name="flash"
                            size={25}
                            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.snapContainer}>
                    <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                        <FontAwesome name="circle-thin" size={95} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </Camera>
            </View>
    );
}


const styles = StyleSheet.create({
    camera: {
        flex: 2.1,
        alignItems: "center",
        width: "100%",
    },
    buttonsContainer: {
        flex: 0.1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    flashButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    snapContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 25,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    topContent: {
        flex: 1,
        marginTop: 50,
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
    },
    button: {
        alignItems: "center",
        paddingTop: 8,
        width: "80%",
        backgroundColor: "blue",
        borderRadius: 10,
    },
    textButton: {
        color: "#ffffff",
        height: 30,
        fontWeight: "600",
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        color: "#5CA4A9",
        marginLeft: 10,
    },
    instructions: {
        color: "#33355C",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 19,
        marginRight: 19,
    },
    explanations: {
        marginLeft: 19,
        marginRight: 19,
        marginTop: 10,
        color: "#33355C",
        fontSize: 16,
        fontStyle: "italic",
    },
    button3: {
        marginTop: 10,
        marginBottom: 70,
        width: 213,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#33355C",
        alignItems: "center",
        justifyContent: "center",
    },
    text3: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 20,
    },
});