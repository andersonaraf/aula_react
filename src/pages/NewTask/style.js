import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    label: {
        width: "90%",
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        fontSize: 16,
        color: "#F92E6A",
    },
    input: {
        width: "90%",
        marginTop: 20,
        padding: 10,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#F92E6A",
        marginLeft: "auto",
        marginRight: "auto",
    },
    image: {
        marginTop: 20,
        width: 300,
        height: 300,
        marginLeft: "auto",
        marginRight: "auto",
    }, 
    addImage: {
        height: 40,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#F92E6A",
    },
    textImage: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonNewTask: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#F92E6a",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    iconButton: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    }
})

export default styles;