import { useEffect } from "react"
import { api } from "../../network/api"
import { Chrono } from "react-chrono"
import { useState } from "react"
import { useParams } from "react-router"

const Timeline = () => {

    const { userId } = useParams();
    useEffect(() => {
        getAll()
    }, [])


    const [item, setItem] = useState([])

    // const [item, setItem] = useState([{
    //     title: "",
    //     cardTitle: '',
    //     url: '',
    //     cardSubtitle: '',
    //     cardDetailedText: '',
    //     media: {
    //         type: "IMAGE",
    //         source: {
    //             url: ""
    //         }
    //     }

    // }])




    const getAll = async () => {
        try {

            const { data } = await api(`api/v1/posts/member/${userId}/time-line`, 'GET')


            const how = data.map((data) => {
                return {
                    tid: data.id,
                    title: new Date(data.setDate).toLocaleDateString(),
                    cardTitle: data.title,
                    cardSubtitle: data.title,
                    cardDetailedText: data.content,
                    timelineContent: <div >
                        <p >{data.setDate} 이건가?</p>
                    </div>,
                    media: {
                        type: "IMAGE",
                        source: {
                            url: `http://localhost:4000/${data.imgPaths}`
                        }
                    }
                }
            })


            setItem(how)
        }
        catch (err) {
            alert('err')
        }
    }

    return <>

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
                items={[...item]} mode="VERTICAL_ALTERNATING"
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