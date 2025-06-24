import React from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MemeTemplate } from '../../types';
import styles from './style';

interface TemplatePickerProps {
  templates: MemeTemplate[];
  onSelectTemplate: (template: MemeTemplate) => void;
  selectedTemplateId?: string | null;
}

const TemplatePicker = ({
  templates,
  onSelectTemplate,
  selectedTemplateId,
}: TemplatePickerProps): React.JSX.Element => {
  const renderItem = ({ item }: { item: MemeTemplate }) => (
    <TouchableOpacity
      onPress={() => onSelectTemplate(item)}
      style={[
        styles.itemContainer,
        selectedTemplateId === item.id && styles.selectedItem,
      ]}
    >
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={templates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TemplatePicker;
