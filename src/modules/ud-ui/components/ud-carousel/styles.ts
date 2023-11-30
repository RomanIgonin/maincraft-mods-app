import styled from '@emotion/native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonWrap = styled(SkeletonContent)``;

interface CarouselWrapProps {
  height: string;
}
export const CarouselWrap = styled.TouchableOpacity<CarouselWrapProps>`
  height: ${props => props.height}px;
  width: 100%;
`;
