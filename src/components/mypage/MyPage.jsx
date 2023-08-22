import AwesomeSlider from "react-awesome-slider";
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fall-animation';


export default function MyPage() {
    return (
        <AwesomeSlider
            animation="fallAnimation"
            cssModule={[CoreStyles, AnimationStyles]}
        >
            <div data-src="https://cdn.travie.com/news/photo/first/201710/img_19975_1.jpg" />
            <div data-src="https://cdn.travie.com/news/photo/first/201710/img_19975_1.jpg" />
            <div data-src="https://cdn.travie.com/news/photo/first/201710/img_19975_1.jpg" />
        </AwesomeSlider>
    )


}
