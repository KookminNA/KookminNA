import axios from 'axios';
import Config from 'react-native-config';
import {decode} from 'html-entities';
import react, {useState} from 'react';


export async function getMember() {
    const url = `https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`;
    var container = []

    await axios.get(url).then(response => {

        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx) {

            const temp = {
                id: idx,
                HG_NM: e['HG_NM'],
                HJ_NM: e['HJ_NM'],
                ORIG_NM: e['ORIG_NM'],
                ENG_NM: e['ENG_NM'],
                BTH_DATE: e['BTH_DATE'],
                BTH_GBN_NM: e['BTH_GBN_NM']

            }
            container.push(temp)
        })
    });
    return container;
}

export async function getProfile(name) {
    // console.log(name)
    const url = `https://open.assembly.go.kr/portal/openapi/nktulghcadyhmiqxi?KEY=7b9fe2d3c59c493b8ada2263157cc926&DEPT_NM=${name}&pIndex=1&pSize=300&Type=json`
    var container = []

    await axios.get(url).then(response => {

        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx) {
            const temp = e['HG_NM']+','+e['POLY_NM'];
            container.push(temp)
        })
    });
    // console.log(container)
    return container;
}


export async function getSchedule() {
    const name = `https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&Type=json`;
    const plenary = `https://open.assembly.go.kr/portal/openapi/nekcaiymatialqlxr?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`
    const seminar = `https://open.assembly.go.kr/portal/openapi/nfcoioopazrwmjrgs?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`;
    const chairman = `https://open.assembly.go.kr/portal/openapi/nhedurlwawoquyxwn?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`
    const comTotal = `https://open.assembly.go.kr/portal/openapi/nttmdfdcaakvibdar?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`
    const comSmall = `https://open.assembly.go.kr/portal/openapi/nrkqqbvfanfybishu?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`
    const comPublic = `https://open.assembly.go.kr/portal/openapi/napvpafracrdkxmoq?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`
    var container = []

    await axios.get(name).then(response => {

        const data = Object.values(Object.values(response.data)[0][1])[0]
        data.map(function(e,idx) {
            var dictObject = {}
            const temp = e['HG_NM']+','+e['POLY_NM'];
            dictObject[temp] = {};

            container.push(dictObject)
        })
    });

    var markedDots = JSON.parse(JSON.stringify(container))

    // 국회 본회의
    await axios.get(plenary).then(response => {
        const type1 = {key: 'type1', color: '#00B383'};
        const data = Object.values(Object.values(response.data)[0][1])[0]
        container.map(function(name,idx){

            data.map(function(e,id){
                const date =e['MEETTING_DATE']; 

                if (name[Object.keys(name)][date] === undefined){

                    name[Object.keys(name)][date] = [
                         {
                        name: e['TITLE'],
                        time: e['MEETTING_TIME'],
                        date: e['MEETTING_DATE'],
                        place: '국회의사당',
                        type: type1
                    }
                ]
                    markedDots[idx][Object.keys(markedDots[idx])][date] = {dots:[type1]}
                }
                else{
                    name[Object.keys(name)][date].push(
                        {
                            name: e['TITLE'],
                            time: e['MEETTING_TIME'],
                            date: e['MEETTING_DATE'],
                            place: '국회의사당',
                            type: type1,
                        }
                    );
                    if (!markedDots[idx][Object.keys(markedDots[idx])][date].dots.includes(type1)){
                        markedDots[idx][Object.keys(markedDots[idx])][date].dots.push(type1)
                    }
                }
                
            })
        })
    
    });

    //국회 세미나 일정 
    await axios.get(seminar).then(response => {
        const type2 = {key: 'type2', color: '#735BF2'};
        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx){
            const nameList = e['NAME'].split('·').join(' ').split(',').join(' ').split('.').join(' ').split(' ');

            container.map(function(i,idx){

                const name = Object.keys(i)[0].split(",")[0]
                nameList.map(function(n,ndx){
                    if (n ===  name){
                        
                        const date =e['SDATE'].split('.').join('-');

                        if (i[Object.keys(i)][date] === undefined){
                            i[Object.keys(i)][date]  = [{
                                name: e['TITLE'],
                                time: e['STIME'],
                                date: date,
                                place: e['LOCATION'],
                                type: type2
                            }];
                            markedDots[idx][Object.keys(markedDots[idx])][date] = {dots:[type2]}
                        }
                        else{
                             i[Object.keys(i)][date].push({
                                name: e['TITLE'],
                                time: e['STIME'],
                                date: date,
                                place: e['LOCATION'],
                                type: type2
                            });
                            if (!markedDots[idx][Object.keys(markedDots[idx])][date].dots.includes(type2)){
                                markedDots[idx][Object.keys(markedDots[idx])][date].dots.push(type2)
                            }
                        }

                    }
                })
              
            });

        });
    });


    //국회의장 주요일정 : 김진표
    await axios.get(chairman).then(response => {
        const type3 = {key: 'type3', color: '#0095FF'};
        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx){
            const date = e['SCHEDULEDATE'].replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

            if ( container[64]['김진표,무소속'][date] === undefined){

                container[64]['김진표,무소속'][date] = [{
                    name: decode(e['CONTENTS']).replace(/<[^>]*>?/g, "").replace(/&nbsp;/gi,''),
                    time: e['SCHEDULETIME'],
                    date: date,
                    place: ' ',
                    type: type3
                }];
                markedDots[64]['김진표,무소속'][date] = {dots:[type3]}

            }
            else{
                container[64]['김진표,무소속'][date].push({
                    name: decode(e['CONTENTS']).replace(/<[^>]*>?/g, "").replace(/&nbsp;/gi,''),
                    time: e['SCHEDULETIME'],
                    date: date,
                    place: ' ',
                    type: type3
                });
                if (!markedDots[64]['김진표,무소속'][date].dots.includes(type3)){
                    markedDots[64]['김진표,무소속'][date].dots.push(type3)
                }
            }

        });
    });

    // 위원회별전체회의일정
    const type4 = {key: 'type4', color: '#F94931'};

    await axios.get(comTotal).then(response => {
        const data = Object.values(Object.values(response.data)[0][1])[0]
        // console.log(data)

        data.map(function(e,idx){

            const title = '[' + e['COMMITTEE_NAME'] +'] '+ e['SESS'] +' '+e['DEGREE']+' '+e['TITLE']
            
            getProfile(e['COMMITTEE_NAME']).then((dat) => {
                dat.map(function(n,ndx){
                    container.map(function(i,idx){

                        const name = Object.keys(i)[0]
                        if (n ===  name){
                            
                            const date =e['MEETING_DATE'].split('.').join('-').split('(')[0];
                            if (i[Object.keys(i)][date] == undefined){
                                i[Object.keys(i)][date]  = [{
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: ' ',
                                    type: type4
                                }];
                                markedDots[idx][Object.keys(markedDots[idx])][date] = {dots:[type4]}

                            }

                            else{
                                i[Object.keys(i)][date].push({
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: ' ',
                                    type: type4
                                });

                                if (!markedDots[idx][Object.keys(markedDots[idx])][date].dots.includes(type4)){
                                    markedDots[idx][Object.keys(markedDots[idx])][date].dots.push(type4)
                                }
                            }
                            
                        }
                
                    })
                })

            }).catch(error => {console.log('error')})
        })
    });

    // 위원회별소회의일정
    await axios.get(comSmall).then(response => {
        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx){

            const title = '[' + e['COMMITTEE_NAME'] +'] '+ e['SESS'] +' '+e['DEGREE']+' '+e['TITLE']

            getProfile(e['COMMITTEE_NAME']).then((dat) => {
                dat.map(function(n,ndx){
                    container.map(function(i,idx){

                        const name = Object.keys(i)[0]
                        if (n ===  name){
                            
                            const date =e['MEETING_DATE'].split('.').join('-').split('(')[0];
                            if (i[Object.keys(i)][date] == undefined){
                                i[Object.keys(i)][date]  = [{
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: ' ',
                                    type: type4
                                }];
                                markedDots[idx][Object.keys(markedDots[idx])][date] = {dots:[type4]}
                            }
                            else{
                                i[Object.keys(i)][date].push({
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: ' ',
                                    type: type4
                                });
                                if (!markedDots[idx][Object.keys(markedDots[idx])][date].dots.includes(type4)){
                                    markedDots[idx][Object.keys(markedDots[idx])][date].dots.push(type4)
                                }
                            }
                            
                        }
                
                    })
                })

            }).catch(error => {console.log('error')})
        })
    });

    // 위원회별공청회일정
    await axios.get(comPublic).then(response => {
        const data = Object.values(Object.values(response.data)[0][1])[0]

        data.map(function(e,idx){

            const title = '[' + e['COMMITTEE_NAME'] +'] '+ e['SESS'] +' '+e['DEGREE']

            getProfile(e['COMMITTEE_NAME']).then((dat) => {
                dat.map(function(n,ndx){
                    container.map(function(i,idx){

                        const name = Object.keys(i)[0]
                        if (n ===  name){
                            
                            const date =e['MEETING_DATE'].split('.').join('-').split('(')[0];
                            if (i[Object.keys(i)][date]==undefined){
                                i[Object.keys(i)][date]  = [{
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: e['TITLE'],
                                    type: type4
                                }];
                                markedDots[idx][Object.keys(markedDots[idx])][date] = {dots:[type4]}
                            }
                            else{
                                i[Object.keys(i)][date].push({
                                    name: title,
                                    time: e['MEETING_TIME'],
                                    date: date,
                                    place: e['TITLE'],
                                    type: type4
                                });
                                if (!markedDots[idx][Object.keys(markedDots[idx])][date].dots.includes(type4)){
                                    markedDots[idx][Object.keys(markedDots[idx])][date].dots.push(type4)
                                }
                            }
                            
                        }
                
                    })
                })

            }).catch(error => {console.log('error')})
        })
    });


    return [container, markedDots];
}

// export async function getMarkedDots() {
//     const name = `https://open.assembly.go.kr/portal/openapi/nwvrqwxyaytdsfvhu?KEY=7b9fe2d3c59c493b8ada2263157cc926&UNIT_CD=100021&pIndex=1&pSize=300&Type=json`;
//     var container = []

//     await axios.get(name).then(response => {

//         const data = Object.values(Object.values(response.data)[0][1])[0]
//         data.map(function(e,idx) {
//             var dictObject = {}
//             const temp = e['HG_NM']+','+e['POLY_NM'];
//             dictObject[temp] = {};

//             container.push(dictObject)
//         })

//         getSchedule().then((dat) => {
//             container.map(function(i,idx){
//                 const name = Object.keys(i)[0]
//                 dat.map(function(n,ndx){
//                     console.log(n)
//                 })
//             })
//         }).catch((error)=>{console.log('error')})
//     });

//     return container;
// }
