import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiService from "../../services/api.service"
import TextAreaInput from "../../components/TextAreaInput"

const RoomDetails = () => {

    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviewComment, setReviewComment] = useState("")
    const [refresh, setRefresh] = useState(true)

    const {id} = useParams()

    useEffect( () => {
        async function fetchData(){
            try{
              const room = await apiService.getRoom(id)
              setRoom(room)
              setLoading(false)
            }catch(err){
              console.log(err)
            }
          }
          fetchData()
    }, [id, refresh] )

    const handleReviewSubmit = async e => {
        e.preventDefault()
        const review = {
            comment: reviewComment
        }
        try{
            await apiService.createReview(id, review)
            setRefresh(!refresh)
            setReviewComment("")
            setShowReviewForm(false)
        }catch(err){
            console.log(err)
        }
    }

    if(loading){
        return (<p>Loading..</p>)
    }

    return (
        <div className="ml-3 mt-4">
            <div className="row">
                <div className="m5">
                    <h1>{room.name}</h1>
                    <img src={room.imageUrl} alt={room.description}></img>
                    <p>{room.description}</p>

                    <div className="reviews">
                        <h2>Reviews</h2>
                        { room.reviews && room.reviews.length > 0 ?  room.reviews.map( review => <p key={review._id}>{review.comment}</p>) : (<p>This room has no reviews</p>) }
                    </div>

                    <button className="btn btn-primary" onClick={() => setShowReviewForm(true)}>Review</button>

                    {showReviewForm && (<div className="review-form">
                        <form onSubmit={handleReviewSubmit}>
                            <TextAreaInput 
                                name="comment"
                                value={reviewComment}
                                onChange = {e => setReviewComment(e.target.value)}
                                placeholder = "Your comment"
                            />
                            <button className="btn btn-success">Send Review</button>
                        </form>
                    </div>) }
                </div>
            </div>
        </div>
    )
}

export default RoomDetails