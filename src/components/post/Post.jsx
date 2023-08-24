
import React, { useState } from 'react';
import './PostModal.scss';
import { api } from '../../network/api';

const PostModal = ({ setPostModalOpen }) => {

    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [setDate, setSetDate] = useState(new Date);

    const closeModal = () => {
        setPostModalOpen(false);
    };

    const handleChangeFile = (event) => {
        setImgFile(event.target.files[0]);
        setImgBase64("");

        if (event.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            // 파일 상태 업데이트
            reader.onloadend = () => {
                // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                const base64 = reader.result;
                if (base64) {
                    var base64Sub = base64.toString()
                    setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                }
            }
        }
    }

    const onChangeSetDateHandler = (e) => {
        console.log(e.target.value)
        const selectedDate = new Date(e.target.value);
        setSetDate(selectedDate)
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
        console.log(title)
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
        console.log(content)
    }

    const writePost = async () => {
        console.log("WriteBoard")
        const fd = new FormData();
        fd.append("file", imgFile);
        fd.append("title", title);
        fd.append("content", content);
        fd.append("subjectNum", 1);
        fd.append("setDate", setDate.toDateString());
        await api('/api/v1/posts', "POST", fd).then((response) => {
            if (response.data) {
                setPostModalOpen(false);
            }
        }).catch((error) => {
        })
    }

    return (
        <div className="modal-overlay">
            <div className="post-modal-content">
                <button className="close-button" onClick={closeModal}>X</button>
                <img src={imgBase64} alt="First slide" style={{ alignContent: 'center', width: "100px", height: "100px" }} />
                <input type='file' placeholder='그림파일만 넣어' name="file" onChange={handleChangeFile}></input><p></p>
                <input type='text' placeholder='title' name="title" onChange={onChangeTitle}></input><p></p>
                <input type='text' placeholder='content' name="content" onChange={onChangeContent}></input><p></p>
                <input type='date' onChange={onChangeSetDateHandler}></input><p></p>
                <button onClick={writePost}>POST</button><p></p>

            </div>
        </div>
    );
};

export default PostModal;
