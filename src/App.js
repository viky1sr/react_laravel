import { Container,Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HeaderComponent from './resource/component/HeaderComponent';
import FooterComponent from './resource/component/FooterComponent';
import HomePage from './resource/pages/HomePage';
import UserPage from './resource/pages/UserPage';
import MahasiswaPage from './resource/pages/MahasiswaPage';
import Login from './resource/component/auth/Login';
import Register from './resource/component/auth/Register';

function App() {
    return (
        <Router>
            <Row>
                <HeaderComponent />
                <main className="py-3">
                    <Container>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/users" component={UserPage} />
                        <Route path="/mahasiswas" component={MahasiswaPage} />
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
