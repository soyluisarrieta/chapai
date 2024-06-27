import React from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const IconComponent = ({iconType, iconName, size, color}: any) => {
  // Map the iconType to the appropriate icon library
  const IconMap: any = {
    AntDesign: AntDesign,
    EvilIcons: EvilIcons,
    Entypo: Entypo,
    Feather: Feather,
    FontAwesome: FontAwesome,
    Fontisto: Fontisto,
    Foundation: Foundation,
    Ionicons: Ionicons,
    MaterialIcons: MaterialIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    Octicons: Octicons,
    Zocial: Zocial,
    SimpleLineIcons: SimpleLineIcons,
  };

  const Icon = IconMap[iconType];

  if (Icon) {
    return <Icon name={iconName} size={size} color={color} />;
  } else {
    // You might want to render a default icon or a placeholder view here
    return <View />;
  }
};

export default React.memo(IconComponent);
