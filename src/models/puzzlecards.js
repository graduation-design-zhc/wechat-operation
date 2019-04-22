import request from '../utils/request'

const dealy = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'puzzlecards',
    state: {
        data: [],
        counter: 0,
    },

    effects: {
        *queryInitCards(_, sagaEffects) {
            console.log("2")
            const { call, put } = sagaEffects;
            const endPointURI = 'https://official-joke-api.appspot.com/random_joke';
            
            const puzzle = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle });
            yield call(delay, 3000);



            const puzzle2 = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle2 });

        }
    },

    reducers: {
        addNewCard(state, { payload: newCard }) {
            const nextCounter = state.counter + 1;
            const newCardWithId = { ...newCard, id: nextCounter };
            const nextData = state.data.concat(newCardWithId);
            return {
                data: nextData,
                counter: nextCounter,
            };
        }
    },
};