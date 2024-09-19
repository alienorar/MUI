
import https from "./config";
const category = {
    create: (data) => https.post("/category/create", data),
    update: () => https.put("/category/update/71"),

}
export default category