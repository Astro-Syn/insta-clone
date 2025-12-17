import {useState} from 'react';
import Notifications from '../notifications/Notifications';
import MyActivity from '../../components/myactivity/MyActivity';
import './Activity.css';


function Activity() {
    const [showNotifications, setShowNotifiations] = useState(true);

  return (
    <div className='activity-container'>
        <div className='activity-title'>
            <p>Activity</p>
        </div>
        
    <div className='button-switcher'>
        <button className={showNotifications ? "active" : ""}
        onClick={() => setShowNotifiations(true)}
        >
            Notifications
        </button>
        <button className={showNotifications ? "active" : ""}
        onClick={() => setShowNotifiations(false)}
        >
            Your Activity
        </button>
    </div>
      <div className="activity-slider-wrapper">
        <div
          className={`activity-slider ${
            showNotifications ? 'show-notifications' : 'show-myactivity'
          }`}
        >
          <div className="activity-panel">
            <Notifications />
          </div>

          <div className="activity-panel">
            <MyActivity />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity