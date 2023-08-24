import AwesomeSlider from "react-awesome-slider";
import { api } from "../../network/api";
import { Fragment, useEffect, useState } from "react"
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fall-animation/fall-animation.scss';
import MyPageModal from "./MyPageModal";
import './MyPage.css'

export default function MyPage() {
    const [showModal, setShowModal] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState([]);
    const [search, setSearch] = useState("");

    const onBlurHandler = (e) => {
        setSearch(e.target.value)
    }

    const getData = async () => {
        const apiUrl = `/api/v1/posts/member/5`
        try {
            const data = await api(apiUrl, 'GET')
            setMyPosts(data.data);
            console.log(data.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [showModal], [search])

    return (
        <Fragment>
            <div className="main-post-rail w-screen sm:w-full">
                <div className="w-screen sm:w-full">
                    <div className="my-6 max-w-[25rem] sm:max-w-[45rem] mx-auto">
                        <input
                            style={{ border: "10px solid red", color: "red" }}
                            type="text"
                            onBlur={onBlurHandler}
                        />
                        <AwesomeSlider animation="fallAnimation" cssModule={[CoreStyles, AnimationStyles]}>
                            {myPosts.map(myPost => (
                                <div className="myPost"
                                    key={myPost.id}
                                    data-src={`http://192.168.0.226:4000/${myPost.imgPaths}`}
                                    onClick={() => {
                                        setSelectedPost(myPost);
                                        setShowModal(true);
                                    }}
                                />
                            ))}
                        </AwesomeSlider>
                    </div>
                </div>
            </div>
            <div className="main-post-rail w-screen sm:w-full">
                <div className="w-screen sm:w-full">
                    <div className="container" >
                        {myPosts
                            .filter(myPost => search === "" || myPost.title === search)
                            .map(myPost => (
                                <div class="item"

                                    key={myPost.id}
                                    onClick={() => {
                                        setSelectedPost(myPost);
                                        setShowModal(true);
                                    }}
                                >
                                    <img class="img" src={`http://192.168.0.226:4000/${myPost.imgPaths}`}></img>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <MyPageModal isvisible={showModal} onClose={() => setShowModal(false)} myPost={selectedPost}></MyPageModal>
        </Fragment>
    )

}

