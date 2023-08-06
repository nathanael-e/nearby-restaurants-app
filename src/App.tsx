import { Oswald_400Regular, useFonts } from '@expo-google-fonts/oswald';
import { RestFinder } from './RestFinder';


export default function App () {
    const [fontsLoaded] = useFonts({
        Oswald_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <RestFinder></RestFinder>
    );
}
