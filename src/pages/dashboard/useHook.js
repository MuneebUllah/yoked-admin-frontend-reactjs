import Api_Hits from '../../apis/Api'
import { useDispatch } from '../../redux/store/store'
import { startLoading, stopLoading } from '../../redux/slices/userSlice'

export default function useDashboard() {
  const dispatch = useDispatch()
  const dashboard = async (body, setDashboardData) => {

    dispatch(startLoading())
    await Api_Hits.dashboardApi(body)
      .then((res) => {
        setDashboardData(res.data)

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(stopLoading())
      })
  }
  return { dashboard }
}
