
export default function objectArrayToObject(objectArray) {
  let obj = Object.create(null);
  objectArray.forEach(({ name, observable }) => {
    obj[name] = observable;
  });
  return obj
}
