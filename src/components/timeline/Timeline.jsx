import { useEffect } from "react"
import { api } from "../../network/api"
import { Chrono } from "react-chrono"
import { useState } from "react"
import { useParams } from "react-router"

const Timeline = () => {

  const { userId } = useParams();
  useEffect(() => {
    getAll()
    getSubject()
  }, [])

  const [subject, setSubject] = useState([{ id: '', name: '' }])
  const [item, setItem] = useState([])

  const getSubject = async () => {
    const { data } = await api(`api/v1/subjects/with-member/${userId}`, 'GET')
    setSubject(data)
  }




  const getAll = async (id = 0) => {

    let what = []
    console.log('몇번시작되나')

    try {

      if (id === 0) {

        const { data } = await api(`api/v1/posts/member/${userId}/time-line`, 'GET')

        what = [...data]
      }
      else {
        const { data } = await api(`api/v1/posts/member/${userId}/time-line/${id}`, 'GET')
        what = [...data]
      }

    }
    catch (err) {
      alert(err)
    }

    if (what.length === 0) {
      setItem(
        [{
          tid: "예시",
          title: "시간",
          cardTitle: "타임라인에 어서오세요",
          cardSubtitle: "글을 작성해주시면 됩니다.",
          cardDetailedText: '',
          media: {
            type: 'IMAGE',
            source: {
              url: `https://blog.kakaocdn.net/dn/bv7hY4/btsr62izhtl/SqGJatsoQiNjLDdadee1a1/img.png`
            }
          }
        }])

    } else {


      const how = what.map((data) => data.imgPaths ?
        {
          tid: data.id,
          title: new Date(data.setDate).toLocaleDateString(),
          cardTitle: data.title,
          cardSubtitle: data.title,
          cardDetailedText: data.content,
          media: {
            type: "IMAGE",
            source: {
              url: `http://localhost:4000/${data.imgPaths}`
            }
          }
        }
        : {
          tid: data.id,
          title: new Date(data.setDate).toLocaleDateString(),
          cardTitle: data.title,
          cardSubtitle: data.title,
          cardDetailedText: data.content,
        }

      )
      setItem(how)
    }
  }

  return <>
    <h1 style={{
      fontSize: '20px',
      border: '1px solid #00498c',
      padding: '2px 14px',
      display: 'inline-block',
      color: 'black',
      background: '#ffffff',
      borderRadius: '5px',
      transition: 'background 0.3s, color 0.3s',
    }}>주제별 타임라인 보기</h1>
    <div><button
      onClick={() => {
        getAll()
      }}
      style={{
        display: 'inline-block',
        margin: '5px',
        padding: '10px 20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.target.style.background = '#808080'; // 호버 시 배경 어둡게
        e.target.style.color = 'lightgray'; // 호버 시 텍스트 색 어둡게
        e.target.style.cursor = 'pointer'; // 커서 모양 변경
      }}
      onMouseLeave={e => {
        e.target.style.background = '#ffffff'
        e.target.style.color = 'black';
      }}
    >
      전체보기
    </button>
      {subject.map(item => (
        <button
          key={item.id} // 고유한 키 지정
          onClick={() => {
            getAll(+item.id)
          }}
          style={{
            display: 'inline-block',
            margin: '5px',
            padding: '10px 20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#808080'; // 호버 시 배경 어둡게
            e.target.style.color = 'lightgray'; // 호버 시 텍스트 색 어둡게
            e.target.style.cursor = 'pointer'; // 커서 모양 변경
          }}
          onMouseLeave={e => {
            e.target.style.background = '#ffffff'
            e.target.style.color = 'black';
          }}
        >
          {item.name}
        </button>
      ))}
    </div>

    <div style={{
      width: "70%", height: "700px",
      left: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translateX(-50%)',
      position: 'relative',
    }}>
      <Chrono

        items={item} mode="VERTICAL_ALTERNATING"
        enableOutline
        allowDynamicUpdate
        scrollable={false}
        // scrollable={{ scrollbar: false }}
        activeItemIndex={-1}
      // onItemSelected={(e) => modal(e)}

      />
    </div>


  </>
}

export default Timeline