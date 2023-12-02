export default function StoreSessionData(data) {
    localStorage.setItem('session', JSON.stringify(data));
}

const getSessionData = () => {
    let data =  JSON.parse(localStorage.getItem('session'));
    return data;
}


export {
    getSessionData
}