import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

export default function symbols() {
  return (
    <View style={styles.container}>
      <SymbolView
        name={{ ios: 'info.circle', android: 'info', web: 'info' }}
        tintColor="#007AFF"
        size={35}
      />
      <SymbolView
        name={{
          ios: 'pencil.tip.crop.circle.badge.plus',
          android: 'home_and_garden',
          web: 'home_and_garden',
        
         }}

        style={styles.symbol}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
});
