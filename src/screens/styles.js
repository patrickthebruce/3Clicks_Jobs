
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    authContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 70,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        
    },

     mapStyle : {
        width: '200px',
        height: '200px'
      },
      
    flatGrid:
    {
        ...Platform.select({
            android: {
              backgroundColor: 'green'
            },
            ios: {
             
            },
            default: {
              // other platforms, web for example
                // backgroundColor: '#03dac',
                flex: 1,
                alignItems:'center'
               
                // paddingLeft:300, 
                // paddingRight:300

    }
})
      },
       
    

    title: {
        alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16

    },
    logo: {
        flex: 1,
        height: 120,
        width: 400,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 30,
    
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    greenText: {
        fontSize: 16,
        color: '#118C4F'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    welcomeText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "center",
    },
    instructionsText: {
        color: "#333333",
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
    },
})