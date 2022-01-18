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
    accScreenContainer: {
        flex: 1,
    },
    smallText: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    tinyText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
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
        marginBottom: 30,
        textAlign: 'center',
    },
    navbarText: {
        fontSize: 20,
        textAlign: 'right',
        color: "#ffffff"
    },
    accFormView: {
        flex: 1,
    },
    accFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
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
    highButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 100,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    warnButton: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    imageUploadContainer: {
        padding:50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    columnView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
});
