// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Panel from './component/Panel';
import Message from './component/Message';
import Compo from './component/Compo';
import SignUp from './component/SignUp';
import Users from './component/Users';
import Research from './component/Research';
import Blog from './component/Blog';
import CreateCat from './component/CreateCat';
import Dark from './component/Dark';
import CatList from './component/CatList';
import CreateSub from './component/CreateSub';
import SubList from './component/SubList';
import ViewResources from './component/ViewResources';
import AddResources from './component/AddResources';
import CreatePages from './component/CreatePages';
import PageList from './component/PageList';
import Footer from './component/Footer';
import Header from './component/Header';
import Approval from './component/Approval';
import ViewMessages from './component/ViewMessages';
import SendMessage from './component/SendMessage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Panel />} />
          <Route path='/Message' element={<Message />} />
          <Route path='/Compo' element={<Compo />} />
          <Route path='/Sign' element={<SignUp />} />
          <Route path='/Users' element={<Users />} />
          <Route path='/Research' element={<Research />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/categories' element={<CreateCat />} />
          <Route path='/dark' element={<Dark />} />
          <Route path='/List' element={<CatList />} />
          <Route path='/sub-category' element={<CreateSub />} />
          <Route path='/sublist' element={<SubList />} />
          <Route path='/view' element={<ViewResources />} />
          <Route path='/add' element={<AddResources />} />
          <Route path='/create' element={<CreatePages />} />
          <Route path='/page' element={<PageList />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/header' element={<Header />} />
          <Route path='/approval' element={<Approval />} />
          <Route path='/viewMsg' element={<ViewMessages />} />
          <Route path='/send' element={<SendMessage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
