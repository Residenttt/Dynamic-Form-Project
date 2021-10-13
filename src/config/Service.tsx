import axios from "axios";

const service = axios.create({
  baseURL: "https://www.jsonbulut.com/json/",
});
const params = {
  ref: "951b628383fb48994a79e30caa9a67da",
  formId: 23,
};

export async function getForm() {
  try {
    const response = await service.get("forms.php", { params: params });
    return [response.data, null];
  } catch (err) {
    return [null, err];
  }
}
