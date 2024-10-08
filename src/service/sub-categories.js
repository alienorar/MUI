import https from "./config";
const subCategory = {
    create: (data) => https.post("/sub-category/create", data),
    get: (id) => https.get(`/sub-category/${id}`),
    update: (id, data) => https.patch(`/sub-category/update/${id}`, data),
    delete: (id) => https.delete(`/sub-category/delete/${id}`),
};

export default subCategory;
