import React, { useEffect, useState } from 'react'
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlanScreen.css'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux';

function PlanScreen() {
    const [products, setProducts] = useState([]);

    const user = useSelector(selectUser);

    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,

                });
            });
        });
    }, [user.uid]);


    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ('prices').get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
                
            });
            setProducts(products);
        });
    }, []);


    console.log(products);
    console.log("Subscriptions should be below");
    console.log(subscription);

    const loadCheckOut = async (priceId) => {
    const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        
        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if(error) {
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                const stripe = await loadStripe('pk_test_51IUmBxCf8UoAb3ekMZdftGRsOgrl8Cy0Zw5Q3Naa3sn6qhCm2HA7RB1hHV2W4RAHxii3zI4wDe77ZxvtDcLyzkR3003YfG3Chl');

                stripe.redirectToCheckout({ sessionId })
            }
        })
    };

    


    return (
        <div className="planScreen">
            {subscription && <p>Renewal date: {new Date(subscription?.
                current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                //add some login to check if the user's subscription is active

                const isCurrentPackage = productData.name
                ?.toLowerCase()
                .includes(subscription?.role);

                return (
                    <div
                    key={productId}
                    className={`${
                        isCurrentPackage && 'plansScreen__plan--disabled'
                        } plansScreen__plan`}>

                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button
                        onClick={() =>
                        !isCurrentPackage && loadCheckOut(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen
