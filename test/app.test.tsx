import { render } from '@testing-library/react-native';
import App from '../src/App';

jest.mock(
    '../src/hooks/useLongitudeLatitude',
    () => ({
        useLongitudeLatitude: () => {
            return {
                status: 'success',
                longitude: 123.456,
                latitude: 78.910,
            };
        },
    })
);


describe('App', () => {
    test.skip('renders the correct content when location status is success', () => {
        const { getByText } = render(<App />);

        expect(getByText('longitude: 123.456 latitude: 78.91')).toBeTruthy();
    });
});