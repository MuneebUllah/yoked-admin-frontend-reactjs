import Api_Hits from '../../apis/Api'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading } from '../../redux/slices/userSlice'

export default function useCommunity() {
    const dispatch = useDispatch()
    const communityPostsApi =async (setCommunityPostData , limit = 10 , offset = 0) => {
        dispatch(startLoading())
        await Api_Hits.communityPosts(offset , limit)
        .then((res)=>{
            setCommunityPostData(res.data.data)

        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }
    const communityPostByIdApi =async ( id ,setCommunityPostData) => {
        dispatch(startLoading())
        await Api_Hits.communityPostsById(id)
        .then((res)=>{
            setCommunityPostData(res.data.data)

        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }
    const communityPostBlockApi = async (id) => {
        await Api_Hits.communityPostBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const communityPostUnBlockApi = async (id) => {
        await Api_Hits.communityPostUnBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
        }
    const commentPostBlockApi = async (id) => {
        await Api_Hits.commentsPostBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const commentPostUnBlockApi = async (id) => {
        await Api_Hits.commentsPostUnBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
        }

    const communityPostComments = async (id , setPostCommentsData) => {
        await Api_Hits.communityPostsComments(id)
            .then((res) => {
                setPostCommentsData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    const communityPostReplies = async (id , setPostRepliesData) => {
        await Api_Hits.communityPostsReplies(id)
            .then((res) => {
                setPostRepliesData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    const communityPostReaction = async (id , setPostReactionData) => {
        await Api_Hits.communityPostReactions(id)
            .then((res) => {
                setPostReactionData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    const communityPostSearchApi = async (searchQuery ,startDate = null , endDate = null   , setCommunityPostData ,  limit = 10 , offset = 0) => {
        dispatch(startLoading())
            await Api_Hits.communityPostsSearch(searchQuery , offset , limit , startDate , endDate)
            .then((res) => {
                setCommunityPostData(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                dispatch(stopLoading())
            })
        // }

        }


  return {communityPostsApi ,communityPostByIdApi , communityPostBlockApi,communityPostSearchApi, commentPostBlockApi , commentPostUnBlockApi , communityPostUnBlockApi , communityPostComments , communityPostReplies , communityPostReaction }
}
