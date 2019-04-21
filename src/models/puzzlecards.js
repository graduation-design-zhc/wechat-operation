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

    effect: {
        *queryInitCards(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const endPointURI = 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke';
            
            const puzzle = yield call(request, endPointURI);
            yield put({ type: 'addNewCard', payload: puzzle });
            yield call(delay, 3000);

            console.log("1")

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