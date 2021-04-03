import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text:'',
      isSearchPressed: true,
      lexicalCategory: '',
      examples: [],
      defination: '',
    };
  }
  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =q
      'https://rupinwhitehatjr.github.io/dictionary/%22' +
      searchKeyword +
      '.json';

    return fetch(url)
      .then((data) => {
        if (data.sttus === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;

        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCartegory = wordData.wordType;

          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCartegory: lexicalCartegory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };
  render() {
    return(
      <View style={styles.container}>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: 'white', fontSize:20},
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: '',
              examples: [],
              defination: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.searchButton}
         
          onPress={() => {
            this.setstate({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}> 
          <Text>
            Go
          </Text>
          </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Word:{''}</Text>
          <Text style>{this.state.word}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Type:{''}</Text>
          <Text style>{this.state.lexicalCategory}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Definition:{''}</Text>
          <Text style>{this.state.defination}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  // inputBoxContainer: {
  //   flex: 0.3,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  detailsContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsTitle: {
    margin: 40,
    marginRight:250,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    margin: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    backgroundColor:"red",
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius: 40,
    width:60,
    height:60,
  },
});
