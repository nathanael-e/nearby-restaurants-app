import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scaleMarginTop = (): number => (
    height*0.06
);

const scaleMarginBottom = (): number => (
    height*0.025
);

const scaleWidth = (): number => (
    width*0.025
);

export const getCardWidth = (): number => (
    Math.floor(width - 2*(width*0.025))
);

export const getCardHeight = (): number => (
    200
);

export const getMainWindowPadding = () => (
    {
        marginBottom: scaleMarginBottom(),
        marginTop: scaleMarginTop(),
        marginLeft: scaleWidth(),
        marginRight: scaleWidth()
    }
);






