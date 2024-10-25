import Api_Hits from '../../../../apis/Api'

export default function useSaved() {
    const savedUserPostsApi = async (id, setSavedPostData,  limit = 10, offset = 0) => {

        await Api_Hits.savedUsersPosts(id, offset, limit)
            .then((res) => {
                setSavedPostData(res.data.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }
    const savedUserReelsApi = async (id, setSavedReelData, limit = 10, offset = 0) => {
        await Api_Hits.savedUsersReels(id, offset, limit)
            .then((res) => {
                setSavedReelData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return { savedUserPostsApi, savedUserReelsApi }
}
