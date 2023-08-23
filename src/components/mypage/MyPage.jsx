import AwesomeSlider from "react-awesome-slider";
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fall-animation';
import Data from "./Data";

export default function MyPage() {
    return (
        <>
            <div className="mx-auto mt-10 flex border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <AwesomeSlider animation="fallAnimation" cssModule={[CoreStyles, AnimationStyles]}>
                    {Data.map((data) => (
                        <div data-src={data.img} />
                    ))}
                </AwesomeSlider>
            </div>
        </>
    )


}
