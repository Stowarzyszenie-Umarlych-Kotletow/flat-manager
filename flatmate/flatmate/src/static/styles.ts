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
    smallTextStart: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'auto',
    },
    bigText: {
        fontSize: 25,
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
    },
    transactionGroupCard: {
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
    },
    transactionCardResolved: {
        borderBottomColor: 'rgb(153, 255, 102)',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 5,
    },
    transactionCardUnresolved: {
        borderBottomColor: 'rgb(255, 153, 204)',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 5,
    },
    transactionItems: {
        borderLeftColor: '#000000',
        borderLeftWidth: 4,
    },
    viewRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    viewRowCrowdy: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    blueButtonSmall: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: 200
    },
    greenButtonSmall: {
        backgroundColor: '#5cd07f',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: 200
        
    },
    redButtonSmall: {
        backgroundColor: '#e74040',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
        width: 200
    },
    transactionCardText: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    transactionCardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    }
});

