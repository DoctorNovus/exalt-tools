export default function fill(data, objects) {
    for (let x in objects) {
        let key = x;
        let val = objects[x];

        let reg = new RegExp("{{" + key + "}}", "g");

        let str = val;        
        let reg2 = new RegExp("{{data}}", "g");
        str = str.replace(reg2, val);

        data = data.replace(reg, str);
    }

    return data;
}