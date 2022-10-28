import React, { useState, useEffect } from 'react';
import styles from './styles'
import * as api from '../../api/server.js';
import Title from '../../component/Title'

import {
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import { SearchPage } from '../../page';

const NameSearch =() =>  {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const getMemberInfo = async () => {
    api.getMember().then(function(data){
      console.log(data)
      setFilteredDataSource(data);
      setMasterDataSource(data);
    })
  }
  useEffect(() => {
    getMemberInfo()
      
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.HG_NM
          ? item.HG_NM.toUpperCase()
         : ''.toUpperCase();
        //  const itemData_ENG = item.ENG_NM
        //   ? item.ENG_NM.toUpperCase()
        //  : ''.toUpperCase();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {

    const imgUrl = `https://www.assembly.go.kr/static/portal/img/openassm/${item.MONA_CD}.jpg`

    return (
      // Flat List Item
      <View style={styles.flatListProfile} onPress={() => getItem(item)}>
        
        <Image source={{uri : imgUrl}} style={styles.profile} />

        <View style={{flexDirection: 'row', margin: 4}}>
          <View style={styles.flatListTextProfile}>
            <Text style={styles.textName}>{item.HG_NM}</Text> 

            <View style={styles.row}>
              <Text style={styles.Ename}>{item.ENG_NM}</Text> 
              <Text style={styles.birth}>{item.BTH_DATE}</Text> 
            </View>

          </View>
          <Text style={styles.textPoly}>{item.POLY_NM}</Text> 
          <Image
            style={styles.star}
            source={require('../../assets/img/EmpyStar.png')}
          />
        </View>
        
       
        
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // 국회의원 리스트 사이사이에 선 긋기
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // 아이템(국회의원 리스트에 있는 칸 한 개) 클릭했을 때
    alert('Id : ' + item.id + ' Title : ' + item.title);
    // 여기에 달력으로 넘어가는 거 구현
  };
  return (
      <SafeAreaView style={{
        backgroundColor: '#ffffff'
      }} >  
      {/* 전체화면 */}
          <View style={styles.imageContainer}> 
          {/* 이미지 담기용 뷰 */}
            <Image 
              source={require('../../assets/img/koreaAssemblyLogo.png')} />
          </View>

          <TextInput
              // 검색바
            style={styles.textInputStyle}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="이름을 입력하세요"
          />
          <SearchPage  /*관심 국화의원 */ />
          
          <View style={styles.assemblyListBar}
          /*국회의원 명단 */ > 
            <Title name={'국회의원 명단'}/>

            <FlatList style= {styles.container}
            data={filteredDataSource}//filteredDataSource
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            />
          </View>
           
          
          
      </SafeAreaView>
    
    
  );
};

export default NameSearch;

