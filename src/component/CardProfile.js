import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const CardProfile = (props, propFunction, data) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => propFunction(data.filter(it => it.id !== props.item.id))}>
         <Image
          style={styles.star}
          source={require('../img/FullStar.png')}
        />
      </TouchableOpacity>
      <Image
        style={styles.profile}
        source={{
          uri: props.item.imgUrl,
        }}
      />
      <View>
        <Text style={styles.poly}>{props.item.poly}</Text>
        <Text style={styles.Hname} numberOfLines={1}>{props.item.name}</Text>
        <Text style={styles.Ename}>{props.item.ename}</Text>
        <Text style={styles.birth}>{props.item.birth}</Text>
      </View>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  container: {
    // width: ,
    padding: 15,
    borderWidth: 1,
    borderColor: '#C9D6E8',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  poly: {
    color: '#3060B0',
    fontSize: 10,
  },
  Hname: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: 'bold'
  },
  Ename: {
    fontSize: 10,
  },
  birth: {
    fontSize: 8,
    marginTop: 2,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 99,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#2B65B4',
    marginBottom: 12
  },
  star:{
    width: 20,
    height: 20,
    position: 'absolute',
    right: -5,
    top: -5,
    // margin: 8
  }
});