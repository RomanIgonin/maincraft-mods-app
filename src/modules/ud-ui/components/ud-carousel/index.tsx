import * as S from './styles';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import screenNames from '@src/modules/navigation/screen-names';
import { useNavigation } from '@react-navigation/native';
import { CarouselItem } from '@src/modules/carousel/domain/interfaces/CarouselItem';

const screenWidth = Dimensions.get('window').width;

interface Props {
  isImageDelayLoading: boolean;
  imageData: CarouselItem[];
  height: number;
  isPressable?: boolean;
}
export default function UDCarouselSlider(props: Props) {
  const { isImageDelayLoading, imageData, height, isPressable = false } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();

  const onPressCarouselItem = ({ item }: CarouselItem) => {
    if (isPressable) {
      if (item.asset_id && item.type) {
        navigation.navigate(screenNames.udDetailsScreen, {
          categoryId: item.asset_id,
          categoryType: item.type,
        });
      }
    }
  };

  const renderItem = ({ item }: any, parallaxProps: any) => {
    const imageUrl = isPressable ? item.url : item.picture.url;

    return (
      <S.CarouselWrap
        activeOpacity={1}
        onPress={() => onPressCarouselItem({ item })}
        height={String(height)}>
        <ParallaxImage
          containerStyle={{ flex: 1 }}
          source={{ uri: imageUrl }}
          parallaxFactor={0}
          fadeDuration={800}
          {...parallaxProps}
        />
      </S.CarouselWrap>
    );
  };

  return (
    <>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
        data={imageData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveIndex(index)}
        useScrollView={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        enableMomentum={true}
        hasParallaxImages={true}
        shouldOptimizeUpdates={true}
      />
      <Pagination
        dotsLength={imageData.length}
        activeDotIndex={activeIndex}
        inactiveDotOpacity={0.35}
        containerStyle={{
          position: 'absolute',
          top: 130,
          right: screenWidth / 2 - 50,
          width: 90,
        }}
        dotStyle={{
          width: 9,
          height: 9,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotScale={1}
      />
      <S.SkeletonWrap
        isLoading={isImageDelayLoading}
        layout={[
          {
            position: 'absolute',
            key: 'someId',
            height: height,
            width: '100%',
            top: -height,
          },
        ]}
      />
    </>
  );
}
