import analytics from '@react-native-firebase/analytics';

class AnalyticService {
  reportEvent(
    eventName: string,
    params?: { [key: string]: any },
  ): Promise<void> {
    return analytics().logEvent(eventName, params);
  }
}

const analyticService = new AnalyticService();
export default analyticService;
