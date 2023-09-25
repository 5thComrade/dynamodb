import toast from "react-hot-toast";
import { string, safeParse, object, number, array } from "valibot";
import { AxiosService } from "@/services/axios.service";

class MessageService extends AxiosService {
  // get all messages from the database
  async getAllMessagesFromDb() {
    const AllMessagesSchema = object({
      count: number(),
      scannedCount: number(),
      items: array(
        object({
          pk: string(),
          sk: string(),
          message: string(),
        })
      ),
    });
    const axiosConfigObj = {
      method: "GET",
      url: "/api/allMessages",
      requestConfig: {},
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      const parseResult = safeParse(AllMessagesSchema, response.data);
      if (response.status === 200 && parseResult.success) {
        return parseResult.output;
      } else {
        throw new Error("fetching all messages failed!");
      }
    } catch (err) {
      console.log("MessageService getAllMessagesFromDb error: ", err);
      throw err;
    }
  }

  // add new message to the database
  async addMessageToDb(message: string) {
    const axiosConfigObj = {
      method: "POST",
      url: "/api/message",
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
      console.log("TestDbConnection addMessageToDb error: ", err);
      throw err;
    }
  }
}

const messageService = new MessageService();

export default messageService;
