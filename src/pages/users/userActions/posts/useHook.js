import { useDispatch } from 'react-redux'
import Api_Hits from '../../../../apis/Api'
import { startLoading, stopLoading } from '../../../../redux/slices/userSlice'

export default function usePost() {
    const dispatch = useDispatch()
    const postApi = async (id, setPostData, limit = 10, offset = 0) => {
        const data = {
            offset,
            limit
        }
        await Api_Hits.userPosts(id, data.offset, limit)
            .then((res) => {
                setPostData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const postByIdApi = async (id, setPostData) => {
        dispatch(startLoading())
        await Api_Hits.userPostById(id)
            .then((res) => {
                setPostData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const reelByIdApi = async (id, setPostData) => {
        dispatch(startLoading())
        await Api_Hits.userReelById(id)
            .then((res) => {
                setPostData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const postReactionApi = async (id, setPostReactionData) => {
        dispatch(startLoading())
        await Api_Hits.userPostReactions(id)
            .then((res) => {
                setPostReactionData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const ReelApi = async (id, setReelsData, limit = 10, offset = 0) => {
        await Api_Hits.userReels(id, offset, limit)
            .then((res) => {
                setReelsData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                dispatch(stopLoading())
            })
    }
    const postBlockApi = async (id) => {
        await Api_Hits.postBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const postUnBlockApi = async (id) => {
        await Api_Hits.postUnBlock(id)
            .then((res) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return { ReelApi, postApi, postByIdApi, postReactionApi, postBlockApi, reelByIdApi, postUnBlockApi }
}
