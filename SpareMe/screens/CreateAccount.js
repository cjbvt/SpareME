'use strict';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import FilterWebView from '../components/FilterWebView'
import firebase from 'react-native-firebase';
import * as constants from 'constants'

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {passwordHasFocus: false};

    }

    onRegister = () => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.props.navigateTutorial();
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in App.js earlier
        }).catch((error) => {
            const { code, message } = error;
            console.log(error);
            var alertMessage = 'Unable to create account.'
            if (message.includes('already in use')) {
                alertMessage = constants.DUPLICATE_EMAIL;
            }
            else if (message.includes('email address')) {
                alertMessage = constants.INVALID_EMAIL;
            }
            else if (message.includes('The given password')) {
                alertMessage = constants.INVALID_PASSWORD;
            }
            Alert.alert(
              'Create Account Failed',
              alertMessage,
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
        });
    }

    onFocus() {
      console.log("onFocus");
      this.setState({
          passwordHasFocus: true
      })
    }

    onBlur() {
      console.log("onBlur");
      this.setState({
        passwordHasFocus: false
      })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.createView}>
                    <Text style={styles.createText}>
                        Create Account
                    </Text>
                    <Text style={styles.headerText}>
                        Email:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        underlineColorAndroid={constants.COLOR_WHITE}
                        autoCapitalize='none'
                        autoCorrect={false}
                        selectionColor={constants.COLOR_GRAY}
                        onChangeText={ (text) => {
                            this.setState({
                                email: text
                            });
                        }}
                    />
                    <Text style={styles.headerText}>
                        Password:
                    </Text>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Enter Password"
                        underlineColorAndroid={constants.COLOR_WHITE}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        selectionColor={constants.COLOR_GRAY}
                        onBlur={ () => this.onBlur() }
                        onFocus={ () => this.onFocus() }
                        onChangeText={ (text) => {
                            this.setState({
                                password: text
                            });
                        }}
                    />
                    {this.state.passwordHasFocus &&
                        <View style={styles.passwordReqContainer}>
                            <Text style={styles.passwordReqHeader}>
                                { 'Password Requirements\n'}
                            </Text>
                              <Text style={styles.passwordReq}>
                                { '\u2022 Between 8 and 25 characters in length\n'}
                                { '\u2022 Must contain at least one UPPER CASE letter\n' }
                                { '\u2022 Must contain at least one lower case letter\n' }
                                { '\u2022 Must contain at least one number or special character' }
                            </Text>
                        </View>
                    }

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title='Create Account'
                                onPress={this.onRegister}
                                color={constants.COLOR_POSITIVE}
                            />
                        </View>
                    </View>
                </View>
            </View>

        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    createView: {
        padding: 50,
        flex: 1,
        backgroundColor: constants.COLOR_MAIN_TRANSPARENT
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        flex: 1,
        height: 40,
        margin: 5
    },
    connectionContainer: {
        flex: 1,
        backgroundColor: constants.COLOR_MAIN,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    connectionText: {
        color: constants.COLOR_WHITE,
        fontSize: constants.TEXT_LARGE
    },
    createText: {
        color: constants.COLOR_WHITE,
        fontSize: constants.TEXT_HEADER,
        marginBottom: 20
    },
    headerText: {
        color: constants.COLOR_WHITE,
        fontSize: constants.TEXT_LARGE,
        marginBottom: 5
    },
    input: {
        alignSelf: 'stretch',
        fontSize: constants.TEXT_MEDIUM,
        marginBottom: 10,
        color: constants.COLOR_WHITE
    },
    inputPassword: {
        alignSelf: 'stretch',
        fontSize: constants.TEXT_MEDIUM,
        color: constants.COLOR_WHITE
    },
    passwordReq: {
        color: constants.COLOR_WHITE,
        fontSize: constants.TEXT_SMALL,
        marginLeft: 8
    },
    passwordReqHeader: {
        color: constants.COLOR_WHITE,
        fontSize: constants.TEXT_MEDIUM,
    },
    passwordReqContainer: {
      height:175,
      padding: 5,
      backgroundColor: '#66666690'
    }
});
