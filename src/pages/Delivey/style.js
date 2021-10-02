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
    buttonFinish: {
        marginTop: 100,
        height: 50,
        width: '45%',
        borderRadius: 5,
        backgroundColor: '#77B55F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButtonFinish: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})

export default styles;