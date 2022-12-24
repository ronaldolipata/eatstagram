import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import CreatePost from '@/pages/CreatePost';
import Profile from '@/pages/Profile';
import Notification from '@/pages/Notification';
import Intro from '@/pages/Intro';
import About from '@/pages/About';
import AppLayout from '@/layouts/AppLayout';
import IntroLayout from '@/layouts/IntroLayout';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfConditions from '@/pages/TermsOfConditions';
import Contact from '@/pages/Contact';
import OtherProfile from '@/pages/OtherProfile';
import ViewPost from '@/pages/ViewPost';
import ViewComment from '@/pages/ViewComment';

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <IntroLayout />,
    children: [
      {
        index: true,
        path: '',
        element: <Intro />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'privacyPolicy',
        element: <PrivacyPolicy />,
      },
      {
        index: true,
        path: 'termsOfConditions',
        element: <TermsOfConditions />,
      },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: 'home',
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'create',
        element: <CreatePost />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'post/:id',
        element: <ViewPost />,
      },
      {
        path: 'post/:id/comments',
        element: <ViewComment />,
      },
      {
        path: 'profile/:id',
        element: <OtherProfile />,
      },
    ],
  },
]);

export default mainRouter;
