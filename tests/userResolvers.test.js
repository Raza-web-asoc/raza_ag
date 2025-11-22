import axios from "axios";
import { resolvers } from "../resolvers/userResolvers.js";

jest.mock("axios");

describe("Resolvers Autenticación - API Gateway", () => {

  beforeEach(() => jest.clearAllMocks());

  // -----------------------------------------
  // Query: getUserData
  // -----------------------------------------
  test("getUserData() retorna datos del usuario", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: { id_user: 50, username: "camila" }
    });

    const result = await resolvers.Query.getUserData(null, { token: "abc" });

    expect(result.username).toBe("camila");
  });

  test("getUserData() lanza error si la API falla", async () => {
    axios.get.mockRejectedValue(new Error("Fallo API"));

    await expect(
      resolvers.Query.getUserData(null, { token: "abc" })
    ).rejects.toThrow("Fallo en la consulta de usuario");
  });

  // -----------------------------------------
  // Mutation: signin
  // -----------------------------------------
  test("signin() inicia sesión correctamente", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { token: "abc123" }
    });

    const result = await resolvers.Mutation.signin(null, {
      input: { username: "camila", password: "1234" }
    });

    expect(result.token).toBe("abc123");
  });

  test("signin() lanza error si la API retorna status != 200", async () => {
    axios.post.mockResolvedValue({ status: 500, statusText: "Error" });

    await expect(
      resolvers.Mutation.signin(null, {
        input: { username: "test", password: "1234" }
      })
    ).rejects.toThrow("Error al iniciar sesión: Error");
  });

  // -----------------------------------------
  // Mutation: signup
  // -----------------------------------------
  test("signup() registra usuario correctamente", async () => {
    axios.post.mockResolvedValue({ status: 200, data: { id: 10 } });

    const result = await resolvers.Mutation.signup(null, {
      input: {
        username: "test",
        names: "Camila",
        last_names: "Amaya",
        email: "ca@mail.com",
        password: "123",
        birthday: "2000-01-01",
        gender: "F"
      }
    });

    expect(result.id).toBe(10);
  });

  test("signup() error de servidor", async () => {
    axios.post.mockRejectedValue({
      response: { data: { detail: "Usuario ya existe" } }
    });

    await expect(
      resolvers.Mutation.signup(null, { input: {} })
    ).rejects.toThrow("Error al registrar:");
  });

  // -----------------------------------------
  // Mutation: editUser
  // -----------------------------------------
  test("editUser() edita datos correctamente", async () => {
    axios.put.mockResolvedValue({
      status: 200,
      data: { message: "Actualizado" }
    });

    const result = await resolvers.Mutation.editUser(null, {
      input: {
        names: "Camila",
        last_names: "Amaya",
        email: "test@mail.com",
        birthday: "2000-01-01",
        gender: "F"
      },
      token: "abc"
    });

    expect(result).toBe("Actualizado");
  });

});
