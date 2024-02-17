import toast from "react-hot-toast";
import { string, safeParse, object, number, array } from "valibot";
import { AxiosService } from "@/services/axios.service";
import { type CustomerSchemaType } from "@/lib/schemas";

class CustomerService extends AxiosService {
  // get all customers from the database
  async getAllCustomersFromDb() {
    const AllCustomersSchema = object({
      count: number(),
      scannedCount: number(),
      items: array(
        object({
          pk: string(),
          sk: string(),
          firstName: string(),
          lastName: string(),
          phone: string(),
          email: string(),
          zipcode: string(),
        })
      ),
    });
    const axiosConfigObj = {
      method: "GET",
      url: "/api/allCustomers",
      requestConfig: {},
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      const parseResult = safeParse(AllCustomersSchema, response.data);
      if (response.status === 200 && parseResult.success) {
        return parseResult.output;
      } else {
        throw new Error("fetching all customers failed!");
      }
    } catch (err) {
      console.log("CustomerService getAllCustomersFromDb error: ", err);
      throw err;
    }
  }

  // add a new customer to db
  async addCustomerToDb(customer: CustomerSchemaType) {
    const axiosConfigObj = {
      method: "POST",
      url: "/api/customer",
      requestConfig: {
        data: {
          customer,
        },
      },
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      if (response.status === 201) {
        toast.success("Customer successfully saved!");
      } else {
        toast.error("Customer not saved! Try again.");
      }
    } catch (err) {
      console.log("TestDbConnection addCustomerToDb error: ", err);
      throw err;
    }
  }

  // get customer from db using their phone number
  async getCustomerFromDb(phone: string) {
    const CustomerSchema = object({
      count: number(),
      scannedCount: number(),
      items: array(
        object({
          pk: string(),
          sk: string(),
          firstName: string(),
          lastName: string(),
          phone: string(),
          email: string(),
          zipcode: string(),
        })
      ),
    });
    const axiosConfigObj = {
      method: "GET",
      url: "/api/customer",
      requestConfig: {
        params: {
          phone: phone,
        },
      },
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      const parseResult = safeParse(CustomerSchema, response.data);
      if (response.status === 200 && parseResult.success) {
        return parseResult.output;
      } else {
        throw new Error("fetching customer details failed!");
      }
    } catch (err) {
      console.log("CustomerService getCustomerFromDb error: ", err);
      throw err;
    }
  }

  // get all customers filtered by their zipcode
  async getCustomersByZipcode(zipcode: string) {
    const CustomerSchema = object({
      count: number(),
      scannedCount: number(),
      items: array(
        object({
          pk: string(),
          sk: string(),
          firstName: string(),
          lastName: string(),
          phone: string(),
          email: string(),
          zipcode: string(),
        })
      ),
    });
    const axiosConfigObj = {
      method: "GET",
      url: "/api/allCustomersByZip",
      requestConfig: {
        params: {
          zipcode: zipcode,
        },
      },
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      const parseResult = safeParse(CustomerSchema, response.data);
      if (response.status === 200 && parseResult.success) {
        return parseResult.output;
      } else {
        throw new Error("fetching customers failed!");
      }
    } catch (err) {
      console.log("CustomerService getCustomersByZipcode error: ", err);
      throw err;
    }
  }

  // get all customers from the database but only selected attributes
  async getAllCustomersFromDbProjected() {
    const AllCustomersSchema = object({
      count: number(),
      scannedCount: number(),
      items: array(
        object({
          pk: string(),
          sk: string(),
          firstName: string(),
          lastName: string(),
          phone: string(),
        })
      ),
    });
    const axiosConfigObj = {
      method: "GET",
      url: "/api/allCustomersProjected",
      requestConfig: {},
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      const parseResult = safeParse(AllCustomersSchema, response.data);
      if (response.status === 200 && parseResult.success) {
        return parseResult.output;
      } else {
        throw new Error("fetching all customers failed!");
      }
    } catch (err) {
      console.log(
        "CustomerService getAllCustomersFromDbProjected error: ",
        err
      );
      throw err;
    }
  }

  // update customer details
  async updateCustomer(
    phone: string,
    updates: {
      firstName?: string;
      lastName?: string;
      email?: string;
      zipcode?: string;
    }
  ) {
    const axiosConfigObj = {
      method: "PATCH",
      url: "/api/customer",
      requestConfig: {
        data: {
          customer: {
            phone: phone,
            updates: updates,
          },
        },
      },
    };

    try {
      const response = await super.requestWithAxios(axiosConfigObj);

      if (response.status === 201) {
        toast.success("Customer successfully updated!");
      } else {
        toast.error("Customer not updated! Try again.");
      }
    } catch (err) {
      console.log("TestDbConnection updateCustomer error: ", err);
      throw err;
    }
  }
}

const customerService = new CustomerService();

export default customerService;
