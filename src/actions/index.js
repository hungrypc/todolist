import firebase from 'firebase';
import { FIREBASE_KEY } from '../config/firebaseKEY';

import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_TODOS,
    CREATE_TODO,
    SELECT_DATE
} from './types';

firebase.initializeApp({
    apiKey: FIREBASE_KEY,
    authDomain: 'to-do-list-a78e2.firebaseapp.com',
    databaseURL: 'https://to-do-list-a78e2.firebaseio.com/',
    projectId: 'to-do-list-a78e2'
});

const db = firebase.firestore();


export const signIn = user => {
    return {
        type: SIGN_IN,
        payload: user
    };
};

export const signOut = () => {
    firebase.auth().signOut();
    return {
        type: SIGN_OUT
    };
};

export const fetchTodo = (uid, dayStart, dayEnd) => {
    return async (dispatch) => {
        await db
            .collection(uid)
            .where('date', ">=", dayStart)
            .where('date', "<=", dayEnd)
            .get()
            .then(doc => {
                let todoArr = [];
                doc.forEach(todo => todoArr.push(todo.data()))
                dispatch({
                    type: FETCH_TODOS,
                    payload: todoArr
                })
            });
    };
};

export const createTodo = (obj) => {
    db.collection(firebase.auth().currentUser.uid).add(obj);
    return {
        type: CREATE_TODO
    };
};

export const selectDate = (date) => {
    let response = new Date(date);
    response.setHours(0,0,0,0);
    return {
        type: SELECT_DATE,
        payload: response
    }
};
