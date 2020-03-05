import * as firebase from 'firebase';  
import React, { Component } from 'react';
import { View, Text, StyleSheet, AlertIOS } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Input, Item } from 'native-base';
import ListComponent from './components/ListComponent';
import './estilos.css';

class App extends Component {
    constructor(){
        super();
        
        this.state = {
            nuevo: '',
            descripcion:'',
            precio:'', 
            lista: []
        }
        
    }
    
    changeDone = (item) => {
        console.log(item);
        this.state.lista = this.state.lista.filter(i => i !== item);
        this.state.lista.push(item);
        this.setState({lista: this.state.lista});
    }
    
    agregarItem = () => {
        let nuevo = this.state.nuevo
        let descripcion = this.state.descripcion
        let precio = this.state.precio
        nuevo = {id:nuevo,name:nuevo, description: descripcion, precio:precio, done:false};
        firebase.database().ref('productos').push(nuevo);
        this.state.lista.push(nuevo);
        this.setState({lista: this.state.lista});
        console.log(nuevo);
        //console.log(this.state.lista);
        
        
    }
    
    listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          name: child.val().name,
          done: child.val().done,  
          id: child.key
        });
      });

      this.setState({
        lista: lista
      });

    });
  }
    
    componentDidMount() {
        const itemsRef = firebase.database().ref('productos');
        this.listenForItems(itemsRef);
      }

    borrar = (item) => {
        let updates = {};
        updates['/items/' + item.id] = null;
        firebase.database().ref().update(updates);
        
    }
    
    render(){
        return(
            <Container style={{backgroundColor:"#f7f7f7"}}>
                <Header style={{backgroundColor:"#5cb85c"}}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Fast Food Duff</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
        
                    <Item>
            <Icon active name='restaurant' />
                        <Input
                            className= "input"
                            value={this.state.nuevo}
                            placeholder='Nombre'
                            onChangeText={nuevo=>this.setState({nuevo})}
                            />
</Item>
<Item>
            <Icon active name='brush' />
<Input
className= "input"
                            value={this.state.descripcion}
                            placeholder='Descripción'
                            onChangeText={descripcion=>this.setState({descripcion})}
                            />
</Item>
<Item>
            <Icon active name='cash' />
<Input
className= "input"
                            value={this.state.precio}
                            placeholder='Precio'
                            onChangeText={precio=>this.setState({precio})}
                            />

                            </Item>

                                  <View>
                        <ListComponent
                            lista={this.state.lista}
                            changeDone={this.changeDone}
                            borrar={this.borrar}
                            />
                </View>    
                                            
                </Content>
                <Footer>
                    <FooterTab>
                        <Button 
                            
                            onPress={this.agregarItem}
                            style={{backgroundColor:"#5cb85c"}}
                            >
                            <Text style={{color:'#FFFFFF'}}>AGREGAR PRODUCTO</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});

export default App;

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDyeTkztuZ4-lj66dnRc98RWcPPAAb-fpA",
    authDomain: "fastfoodduff.firebaseapp.com",
    databaseURL: "https://fastfoodduff.firebaseio.com",
    projectId: "fastfoodduff",
    storageBucket: "fastfoodduff.appspot.com",
    messagingSenderId: "409041514843",
    appId: "1:409041514843:web:bec08ab6c4d52434f0ea7e",
    measurementId: "G-G9QNB6E7FW"
};
firebase.initializeApp(config);