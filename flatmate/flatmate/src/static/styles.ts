import { Background } from "@react-navigation/elements";
import {StyleSheet} from "react-native";
import { withTheme } from "react-native-elements";

export default StyleSheet.create({
    eventFail: {
        backgroundColor: 'red'
    },
    eventPending: {
        backgroundColor: "blue"
    },
    eventCompleted: {
        backgroundColor: "green"
    },
    eventFuture: {
        backgroundColor: "indigo"
    },
    smallTextCenter: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    tinyTextCenter: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'auto',
    },
    warningText: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'red',
        textAlign: 'center',
    },
    loginLogoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    blueButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    greenButton: {
        backgroundColor: '#5cd07f',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    redButton: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    blueButtonTall: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 100,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    greenButtonNarrow: {
        backgroundColor: '#5cd07f',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: window.window.outerWidth * 0.35
    },
    blueButtonNarrow: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: window.window.outerWidth * 0.35
    },
    redButtonNarrow: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: window.window.outerWidth * 0.35
    },
    imageUploadContainer: {
        padding:50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderLeftBlack: {
        borderLeftColor: '#000000',
        borderLeftWidth: 4,
        paddingLeft: 5
    },
    columnView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    viewRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    viewRowCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    card: {
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 5,
        marginBottom: 5,
    }
});

