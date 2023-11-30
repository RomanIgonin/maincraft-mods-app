import React, { useRef, useState } from 'react';
import * as S from './styles';
import { TabView } from 'react-native-tab-view';
import { BG_TOP_BAR } from '@src/assets/constants/imagePaths';
import { Dimensions, View } from 'react-native';
import { Route, SceneRendererProps } from 'react-native-tab-view/src/types';

const { width } = Dimensions.get('window');

type SceneProps = {
  route: any;
} & Omit<SceneRendererProps, 'layout'>;

interface Props {
  routes: Route[];
  renderScene: ({ route, jumpTo, position }: SceneProps) => React.JSX.Element;
  isYourLikeList?: boolean;
}

export default function UDTabView(props: Props) {
  const { routes, renderScene, isYourLikeList = false } = props;

  const [index, setIndex] = React.useState(0);

  const [dataSourceCords, setDataSourceCords] = useState<number[]>([]);
  const scrollViewRef = useRef(null);

  const onPressTabBarItem = (key: number) => {
    setIndex(key);
    scrollViewRef.current?.scrollTo({
      x: dataSourceCords[key - 1],
      y: 0,
      animated: true,
    });
  };

  const routesMap = () => {
    return routes.map((route, key) => {
      return (
        <View
          key={key}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            dataSourceCords[key] = layout.x;
            setDataSourceCords(dataSourceCords);
          }}>
          <S.TabBarItemWrap onPress={() => onPressTabBarItem(key)}>
            <S.TabBarItemText fSize={18} color={'light'}>
              {route.title}
            </S.TabBarItemText>
            {index === key && <S.UnderLine />}
          </S.TabBarItemWrap>
        </View>
      );
    });
  };

  const renderTabBar = () => {
    return (
      <S.TabBarShadow>
        <S.TabBarWrap source={BG_TOP_BAR}>
          {isYourLikeList ? (
            routesMap()
          ) : (
            <S.ScrollView
              ref={scrollViewRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {routesMap()}
            </S.ScrollView>
          )}
        </S.TabBarWrap>
      </S.TabBarShadow>
    );
  };

  return (
    <S.Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
      />
    </S.Container>
  );
}
