

export default function objectArrayToObject(objectArray) {
    let obj = Object.create(null);
    objectArray.forEach(({key, value}) => {
        obj[key] = value;
    })
}
