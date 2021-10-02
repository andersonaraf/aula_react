import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        alignItems: 'center',
    },
    containerStatus: {
        width: '100%',
        height: '10%',
        backgroundColor: '#8BD078',
        padding: 5,

        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: '600'
    },
    map: {
        width: '100%',
        height: '50%',
    },
    containerScroll: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    produto: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: 300,
        height: 200,
        backgroundColor: "black",
        alignSelf: "center",
        marginTop: 80
    },
    buttons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "black",
        margin: 20,
        borderRadius: 150,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTakePicture: {
        flex: 0,
        alignSelf: "center",
        position: "absolute",
        bottom: 20
    },
    buttonCloseCamera: {
        flex: 0,
        position: "absolute",
        top: 20,
        right: 20
    },
})

export default styles;