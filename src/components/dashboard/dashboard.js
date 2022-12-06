import {Link} from 'react-router-dom';
import './dashboard.css';
export const Dashboard = () => {
  return (
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
      <Link to='/' className='logo'>Work_Space</Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to='/' className='Menu'>Home</Link>
            </li>
            <li class="nav-item">
            <Link to='/img-pdf' className='Menu'>Image-PDF</Link>
            </li>
            <li class="nav-item">
            <Link to='/csv' className='Menu'>CSV Operation</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
