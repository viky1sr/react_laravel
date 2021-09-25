import { Container,Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HeaderComponent from './resource/component/HeaderComponent';
import FooterComponent from './resource/component/FooterComponent';
import HomePage from './resource/pages/HomePage';
import MahasiswaPage from './resource/pages/MahasiswaPage';
import Login from './resource/component/auth/Login';
import Register from './resource/component/auth/Register';
import RegisterPage from './resource/pages/RegisterPage';
import UpdatePage from './resource/pages/UpdatePage';
import ProfilePage from './resource/pages/ProfilePage';
import ShowPage from './resource/pages/ShowPage';

function App() {

    return (
        <Router>
            <Row>
                <HeaderComponent />
                <main className="py-3">
                    <Container>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/mahasiswas" component={MahasiswaPage} />
                        <Route path="/mahasiswa/register" component={RegisterPage} />
                        <Route path="/mahasiswa/:id/edit" component={UpdatePage} />
                        <Route path="/mahasiswa/:id/profile" component={ProfilePage} />
                        <Route path="/mahasiswa/:id/show" component={ShowPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Container>
                </main>
                <FooterComponent />
            </Row>
        </Router>
    );

}

export default App;
