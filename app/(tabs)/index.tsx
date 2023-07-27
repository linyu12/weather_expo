import React from 'react';
import { StyleSheet } from 'react-native';
import {FetchExample} from './api';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

interface ITEM {
  lat: string;
  lon: string;
  locationName: string;
  stationId: string;
  time: {
      obsTime: string;
  };
  weatherElement: {
      elementName: string;
      elementValue: string;
  }[];
  parameter: {
      parameterName: string;
      parameterValue: string;
  }[];
}

export default function TabOneScreen() {
  const data = FetchExample();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新竹市</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {data.map((item: ITEM) => {
        const weatherElement_weather = item.weatherElement.find(
          (element) => element.elementName === "Weather"
        );
        if (item.lat === "24.753481" && weatherElement_weather) {
          return(
            
          <Text key={item.stationId} style={styles.word}>  {/*Each child in a list should have a unique "key" prop. */}
            氣溫: {item.weatherElement[3].elementValue}°C {'\n'}
            天氣: {weatherElement_weather?.elementValue} {'\n'} {'\n'}
            <Text style={styles.word_light}>
            上次更新時間: {'\n'} {item.time.obsTime} {'\n'}
            </Text>
          </Text>
          )
        };
      })}
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  word: {
    fontSize: 19,
    textAlign: 'center',
  },
  word_light: {
    fontSize: 15,
    textAlign: 'center',
    color: '#888888',
  },
});
