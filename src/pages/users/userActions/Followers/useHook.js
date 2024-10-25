import Api_Hits from '../../../../apis/Api'

export default function UseFollowers() {

    const FollowersApi = async (id, setFollowersData, limit = 10, offset = 0) => {
        await Api_Hits.userFollowers(id, offset, limit)
            .then((res) => {
                setFollowersData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const FollowingApi = async (id, setFollowingData, limit = 10, offset = 0) => {
        await Api_Hits.userFollowing(id, offset, limit)
            .then((res) => {
                setFollowingData(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return { FollowersApi, FollowingApi }
}
