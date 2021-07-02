import React from 'react'
import './ProfileScreen.css'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlanScreen from './PlanScreen'


function ProfileScreen() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout());
        })
        
    };

    return (
        <div className="profileScreen">
            <Nav/>
        <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt=""/>
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h3>Plans</h3>
                        {/* <div className="profileScreen__standardPlan">
                            <h5 className="plan__labels">Netflix Standard (1080p)</h5>
                            <button className="subscribe">Subscribe</button>
                        </div>
                        <div className="profileScreen__basicPlan">
                            <h5 className="plan__labels">Netflix Basic (480p)</h5>
                            <button className="subscribe">Subscribe</button>
                        </div>
                        <div className="profileScreen__premiumPlan">
                            <h5 className="plan__labels">Netflix Premium (4k+HDR)</h5>
                            <button className="subscribe current__package">Current Package</button>
                        </div> */}
                        <PlanScreen/>



                        <button
                        onClick={signOut}
                        className="profileScreen__signOut">Sign Out</button>
                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default ProfileScreen
