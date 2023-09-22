import toast from "react-hot-toast";
import { AxiosService } from "@/services/axios.service";

class TestDbConnection extends AxiosService {
  async addMessageToDb(message: string) {
    const axiosConfigObj = {
      method: "POST",
      url: "/api/testDbConnection",
      requestConfig: {
        data: {
          message,
        },
      },
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);
      if (response.status === 201) {
        toast.success("Message successfully saved!");
      } else {
        toast.error("Message not saved! Try again.");
      }
    } catch (err) {
      console.log("TestDbConnection service error: ", err);
      throw err;
    }
  }
}

const testDbConnectionService = new TestDbConnection();

export default testDbConnectionService;
