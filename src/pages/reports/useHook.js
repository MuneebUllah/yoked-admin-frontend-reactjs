import { useDispatch } from 'react-redux'
import Api_Hits from '../../apis/Api'
import { startLoading, stopLoading } from '../../redux/slices/userSlice'

export default function useReport() {
 const dispatch = useDispatch()
    const reportPost = ( setReportPostData ,startDate = null,endDate = null,  limit = 10 , offset = 0) => {
        dispatch(startLoading())
        Api_Hits.reportPost(startDate,endDate,offset , limit )
        .then((res)=>{
            setReportPostData(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }
    // const reportReel = ( setReportPostData , startDate = null,endDate = null, limit = 10 , offset = 0) => {
    //     dispatch(startLoading())
    //     Api_Hits.reportReel(startDate,endDate,offset , limit)
    //     .then((res)=>{
    //         setReportPostData(res.data.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    //     .finally(()=>{
    //         dispatch(stopLoading())
    //     })
    // }
    const reportPostById = (id ,setPostDataById  ,limit = 3 , offset = 0) => {
        Api_Hits.reportPostById(id  , offset , limit)
        .then((res)=>{
            setPostDataById(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // const reportReelById = (id ,setPostDataById  ,limit = 3 , offset = 0) => {
    //     Api_Hits.reportReelById(id  , offset , limit)
    //     .then((res)=>{
    //         setPostDataById(res.data.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }
    const reportStories = (setReportStoriesData  ,startDate = null,endDate = null, limit = 10 , offset = 0) => {
        dispatch(startLoading())
        Api_Hits.reportStories(startDate,endDate,offset ,limit)
        .then((res)=>{
            setReportStoriesData(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            dispatch(stopLoading())
        })
    }
    const reportStoriesById = ( id , setStoryDataById , limit = 3 , offset = 0) => {
        Api_Hits.reportStoriesById(id , offset ,limit)
        .then((res)=>{
            setStoryDataById(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const reportCommunityPosts = (setCommunityPostData ,startDate = null,endDate = null, limit = 10 , offset = 0) => {
        dispatch(startLoading())
        Api_Hits.reportCommunityPosts(startDate,endDate,offset ,limit)
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
    const reportCommunityPostById = (id , setCommunityPostDataById , limit = 10 , offset = 0) => {
        Api_Hits.reportCommunityPostsById(id , offset ,limit)
        .then((res)=>{
            setCommunityPostDataById(res.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }



    const storiesBlockApi = async (id) => {
        await Api_Hits.storiesBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const storiesUnBlockApi = async (id) => {
        await Api_Hits.storiesUnBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
        }
  return { reportPost ,reportStories, reportCommunityPosts, reportPostById ,  reportStoriesById , storiesBlockApi , storiesUnBlockApi , reportCommunityPostById}
}
