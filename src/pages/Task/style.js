import { StyleSheet } from "react-native";
import { marginRight } from "styled-system";

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    Task: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    deleteTask: {
        justifyContent: 'center',
        paddingLeft: 15,
    },
    textDelete: {
        height: 30,
        fontSize: 16,
        color: '#F92E00',
        fontWeight: 'bold',
    },
    DescriptionTask: {
        width: '55%',
        alignContent: 'flex-start',
        backgroundColor: '#f5f5f5cf',
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        color: "#282b2db5",
    },
    buttonNewTask: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 30,
        left: 20,
        backgroundColor:"#f92e6a",
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold',
    },
    deliveryButtom: {
        width: '15%',
        height: '80%',
        borderRadius: 5,
        backgroundColor: 'red',
        backgroundColor: '#77B55F',
        alignItems: 'center',
    }
 });

 export default styles;