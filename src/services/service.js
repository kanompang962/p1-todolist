// เก็บข้อมูลลง session storage
export const setStorage = (data) => {
    if (window !== undefined) {
        localStorage.setItem('contentStorage', JSON.stringify(data));
    }
}

// ดึงข้อมูล tokens
export const getStorage = () => {
    if (window !== undefined) {
        if (localStorage.getItem('contentStorage')) {
            return JSON.parse(localStorage.getItem('contentStorage'));
        } else {
            return null;
        }
    }
}