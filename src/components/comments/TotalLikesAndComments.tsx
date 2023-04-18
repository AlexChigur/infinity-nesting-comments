import '../../styles/totalLikesAndComments.css'
import like from '../../assets/images/like.png'

type TotalLikesAndCommentsProps = {
    totalComments: number
    totalLikes: number
}

export const TotalLikesAndComments = (
    {
    totalComments, totalLikes
}: TotalLikesAndCommentsProps) => {
    return (
        <div className='total-block'>
            {totalComments} comments
            <div className='total-likes'>
                <img className="img-like" src={like} alt="like"/>
                {totalLikes}
            </div>
        </div>
    )

}