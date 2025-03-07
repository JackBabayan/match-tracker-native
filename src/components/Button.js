import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.button, props.disabled && styles.disabled]}
      onPress={props?.onPress || null}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{props.text}</Text>
        {props.icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 204, 
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#EB0237',
    borderRadius: 4, 
},
buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,

  },
  buttonText: {
    fontWeight: '500',
    color: '#FFFFFF', 
    fontSize: 18, 
    lineHeight: 1.2,
  },
  disabled: {
    backgroundColor: '#701328', 
    color: '#787878', 
    cursor: 'not-allowed',
  },
  hover: {
    backgroundColor: '#A01131',
  },
});
