import { lazy, Suspense } from 'react';
import Loader from '@/components/shared/Loader';
import ScrollToTop from '@/components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'tippy.js/dist/tippy.css'; // optional

import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const PreLayout = lazy(() => import('@/layouts/PreLayouts'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const HeaderSidebarLayout = lazy(() => import('@/layouts/HeaderSidebarLayout'));
const OnlyHeaderLayout = lazy(() => import('@/layouts/OnlyHeaderLayout'));

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));
const PageNotFound = lazy(() => import('@/pages/404'));
const SearchMail = lazy(() => import('@/pages/Mail/SearchMail'));
const ConfirmWillSendEmail = lazy(() => import('@/pages/Mail/ConfirmWillSendEmail'));
const MailTypeCode = lazy(() => import('@/pages/Mail/MailTypeCode'));
const ConfirmEmail = lazy(() => import('@/pages/Mail/ConfirmMail'));
const Friend = lazy(() => import('@/pages/Friend'));
const Profile = lazy(() => import('@/pages/Profile'));
const Post = lazy(() => import('@/pages/Post'));
const SearchResult = lazy(() => import('@/pages/SearchResult'));



// test
const MySkeleton = lazy(() => import('@/components/shared/CustomSkeleton/PostItemSkeleton'));

function App() {

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <ScrollToTop>
          <Routes>
            {/* no layout - auth layout */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* pre layout */}
            <Route element={<PreLayout />}>
              <Route path="/recover/search-account" element={<SearchMail />} />
              <Route path="/recover/initiate" element={<ConfirmWillSendEmail />} />
              <Route path="/recover/code" element={<MailTypeCode />} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
            </Route>

            {/* only header layout */}
            <Route path="/" element={<OnlyHeaderLayout />}>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/search/top" element={<SearchResult />} />
            </Route>

            {/*  main layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
            </Route>

            {/* flexing sidebar with header */}
            <Route path="/" element={<HeaderSidebarLayout />}>
              <Route path="/friends" element={<Friend />} />
              
            </Route>

            {/* test */}
            <Route path="/test" element={<MySkeleton />} />

            {/* 404 */}

            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<PageNotFound />} />
          </Routes>
          <ToastContainer autoClose={2000} style={{ padding: '20px' }} />
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
