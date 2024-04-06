import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { logoutAdmin, reset } from '../features/adminAuth/adminAuthSlice'


function AdminHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {admin} = useSelector((state)=>state.adminAuth)


  const onLogoutAdmin = () => {
    dispatch(logoutAdmin())
    dispatch(reset())

    navigate('/admin/login')
  }

  return (
    <div>
      <header className='header'>
        <div className="logo">
          {/* <Link to='/'>  */}
          Admin
          {/* </Link> */}

        </div>
        <ul>
          {admin ? (
            <ul>
              <li>
                <button className='btn' onClick={onLogoutAdmin}>
                  <FaSignOutAlt /> logout
                </button>
              </li>
            </ul>
          ) : (
            <>
            </>
          )}
        </ul>

      </header>
    </div>
  )
}

export default AdminHeader
