import axios from 'axios';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './constants/config';
import { userExists, userNotExists } from './redux/reducers/authSlice';
import { SocketProvider } from './socket';

/* lazy is a function provided by React that allows you to dynamically import a component using 
import() and lazily load it. Lazily loading components means that they are only loaded when they 
are needed, typically when rendering certain routes or UI components. */

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashborad = lazy(() => import('./pages/admin/Dashborad'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessagesManagement = lazy(() =>
  import('./pages/admin/MessageManagement')
);

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<Dashborad />}></Route>
          <Route path="/admin/users" element={<UserManagement />}></Route>
          <Route path="/admin/chats" element={<ChatManagement />}></Route>
          <Route
            path="/admin/messages"
            element={<MessagesManagement />}
          ></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
