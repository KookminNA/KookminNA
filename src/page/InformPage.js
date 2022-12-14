import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import InformTable from '../component/InformTable.js';

const InformPage = ({navigation: {navigate}, route}) => {


  return (
    <SafeAreaView>
      <ScrollView>
          <InformTable mona_cd={route.params.mona_cd}/>
      </ScrollView>
    </SafeAreaView>
  );
};
export default InformPage;

const styles = StyleSheet.create({

  scrollView: {
    marginHorizontal: 20,
  }
});