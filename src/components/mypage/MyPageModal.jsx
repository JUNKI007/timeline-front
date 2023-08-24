import React from "react";
import { useState, useEffect } from "react";
import { api } from "../../network/api";

const MyPageModal = ({ isvisible, onClose, myPost }) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        const apiUrl = `/api/v1/comments/to-post/1`
        try {
            const data = await api(apiUrl, 'GET')
            setComments(data.data);
            console.log(data.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    if (!isvisible) { return null; }

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id='wrapper'
            onClick={handleClose}
            style={{ zIndex: 1000 }}>
            <div className="w-[600px] flex flex-col">
                <div className="bg-white p-2 rounded">
                    {myPost.title}
                    {myPost.content}
                    <img src={`http://192.168.0.226:4000/${myPost.imgPaths}`} alt="" />
                    {myPost.CreateAt}
                    {comments.map(comment => (
                        <div className="comment"
                            key={comment.id}>
                            {comment.comment}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyPageModal