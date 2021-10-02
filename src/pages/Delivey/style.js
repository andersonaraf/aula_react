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
    botao: {
        justifyContent: 'center',
        paddingLeft: 15,
        backgroundColor: '#054f77',
        padding: 20,
        margin:10,
    },
    textbotao: {
        textAlign:'center',
        height: 30,
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
})

export default styles;