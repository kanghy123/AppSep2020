import {Block, Button, TextView, linearGradient} from '../../components';
import foodapp from '../../mooks/foodapp.json';
import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ListAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: foodapp,
      data_temp: foodapp,
      search: '',
    };

    this._navigateTo = this._navigateTo.bind(this);
  }

  _navigateTo(pageName) {
    this.props.props.navigation.navigate(pageName);
  }

  _Rating(item) {
    let rating = [];
    for (let i = 0; i < item; i++) {
      rating.push(
        <Image
          source={require('../../assets/star.png')}
          style={{width: 15, height: 15, marginRight: 3}}
          resizeMode="cover"
        />,
      );
    }
    return rating;
  }
  renderItem = ({item}) => {
    return (
      <LinearGradient
        paddingBottom={5}
        colors={['#e1dedd', 'white']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={style.item}>
        <View style={style.image_container}>
          <Image source={{uri: item.image}} style={style.image} />
        </View>
        <View style={style.content}>
          <TextView style={style.styleName}>{item.name}</TextView>
          <TextView color="gray">By {item.location}</TextView>
          <View style={style.rating}>{this._Rating(item.rating)}</View>
          <View style={style.price_container}>
            <View style={style.price}>
              <TextView style={style.textPrice}>{item.price}</TextView>
            </View>
          </View>
        </View>

        <TouchableOpacity
          // onPress={() =>
          //   this.props.navigate('Detail', {
          //     name: item.name,
          //     price: item.price,
          //   })
          // }
          onPress={() => this._navigateTo('Detail')}
          style={style.button}>
          <AntDesign name="arrowright" color="white" size={20} />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={{height: 10}} />;
  };

  _search(text) {
    let data = [];
    this.state.data_temp.map(function (value) {
      if (value.name.indexOf(text) > -1) {
        data.push(value);
      }
    });
    this.setState({
      data: data,
      search: text,
    });
  }
  render() {
    return (
      <View style={style.container}>
        <View style={style.section}>
          <TextInput
            placeholder="Search.."
            style={{flex: 1, marginLeft: 10}}
            value={this.state.search}
            onChangeText={(text) => this._search(text)}
          />
          <TouchableOpacity
            onPress={() => this._search('')}
            style={{paddingHorizontal: 10}}>
            <MaterialIcons name="close" color="gray" size={25} />
          </TouchableOpacity>
        </View>
        <View style={style.flastList}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flastList: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  image_container: {
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  styleName: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#e1dedd',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price_container: {
    flexDirection: 'row',
    margin: 10,
  },
  price: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  textPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
});