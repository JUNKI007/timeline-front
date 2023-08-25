import AwesomeSlider from "react-awesome-slider";
import { api } from "../../network/api";
import { Fragment, useEffect, useState } from "react"
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fall-animation/fall-animation.scss';
import MyPageModal from "./MyPageModal";
import { useParams } from 'react-router-dom';
import './MyPage.css'
import { useSelector } from "react-redux";


export default function MyPage() {
    const [showModal, setShowModal] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null);
    const [search, setSearch] = useState("");
    const { userId } = useParams();

    const user = useSelector((state) => state.me);


    const onBlurHandler = (e) => {
        setSearch(e.target.value)
    }

    const getData = async () => {
        const apiUrl = `/api/v1/posts/member/${userId}`
        try {
            const data = await api(apiUrl, 'GET')
            setMyPosts(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [showModal, search])

    return (
        <Fragment>
            <div className="main-post-rail w-screen sm:w-full">
                <div className="w-screen sm:w-full">
                    <div className="my-6 max-w-[25rem] sm:max-w-[45rem] mx-auto">
                        <input
                            style={{ border: "1px solid black", color: "black", borderRadius: "5px" }}
                            type="text"
                            onBlur={onBlurHandler}
                        />
                        <AwesomeSlider animation="fallAnimation" cssModule={[CoreStyles, AnimationStyles]}>
                            {myPosts.map(myPost => (
                                <div className="myPost"
                                    style={{ borderRadius: "5px" }}
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
                    <div className="container my-6 max-w-[25rem] sm:max-w-[45rem] mx-auto mt-11" >
                        {myPosts
                            .filter(myPost => search === "" || myPost.title.includes(search))
                            .map(myPost => (
                                <div className="item"
                                    key={myPost.id}
                                    onClick={() => {
                                        setSelectedPost(myPost);
                                        setShowModal(true);
                                    }}
                                >
                                    <img className="img" src={`http://192.168.0.226:4000/${myPost.imgPaths}`} alt={myPost.title} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {selectedPost && <MyPageModal isvisible={showModal} onClose={() => setShowModal(false)} myPost={selectedPost}></MyPageModal>}
        </Fragment>
    )
}
