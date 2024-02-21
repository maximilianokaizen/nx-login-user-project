import Login from '../app/components/login/login';
import { loginService } from './services/login/login';

export function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Login/>
        </div>
      </div>
    </>
  );
}
export default Home;
