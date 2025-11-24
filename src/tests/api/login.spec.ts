import test, { expect } from "@playwright/test";
import { apiConfig } from "../../config/apiConfig";
import { credentials } from "../../config/env";
import { loginSchema } from "../../data/salesPortal/schemas/products/login.schema";
import { STATUS_CODES } from "../../data/statusCodes";
import { validateResponse } from "../../utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login as ADMIN user", async ({ request }) => {
    const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json"
      }
    });

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
  });
});