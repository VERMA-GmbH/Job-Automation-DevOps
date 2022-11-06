import { v4 as uuidv4 } from "uuid";

class CURD {
  setData(data: { [key: string]: any }) {
    localStorage.setItem(uuidv4(), JSON.stringify(data));
  }

  getAll() {
    let data: Array<{ [key: string]: any }> = [];
    Object.keys(localStorage).forEach((key) => {
      const strData = localStorage.getItem(key);
      if (strData) {
        data.push({
          ...JSON.parse(strData),
          id: key,
        });
      }
    });
    return data;
  }

  getItem(id: any) {
    const data = localStorage.getItem(id);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  updateItem(id: any, data: { [key: string]: any }) {
    localStorage.setItem(id, JSON.stringify(data));
  }

  remove(id: any) {
    localStorage.removeItem(id);
  }
}

const curd = new CURD();
export default curd;
