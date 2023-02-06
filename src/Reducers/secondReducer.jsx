

const secondReducer = (state = 100, action) => {
    if (action.type === 'BUTTON_TWO') {
        console.log('secondReducer state', state);
        console.log('Button 2 was clicked!');
        return state - 1;
    }
    return state;
}



export default secondReducer;