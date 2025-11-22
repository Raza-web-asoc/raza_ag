import axios from "axios";
import { resolvers } from "../resolvers/petsResolvers.js";

jest.mock("axios");

describe("Resolvers Mascotas - API Gateway", () => {

  beforeEach(() => jest.clearAllMocks());

  // -----------------------------------------------------
  // Query: pets
  // -----------------------------------------------------
  test("pets() retorna mascotas correctamente cuando NO hay id_usuario", async () => {
    const mockPets = [{ id: 1, nombre: "Thor" }];

    axios.get.mockResolvedValue({ status: 200, data: mockPets });

    const result = await resolvers.Query.pets(null, { id_usuario: null });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API_PETS_URL}/mascotas/`
    );

    expect(result).toEqual(mockPets);
  });

  test("pets() retorna mascotas por id de usuario", async () => {
    axios.get.mockResolvedValue({ status: 200, data: [{ id: 1 }] });

    const result = await resolvers.Query.pets(null, { id_usuario: 5 });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API_PETS_URL}/mascotas/usuario/5`
    );
  });

  test("pets() lanza error si la API retorna status != 200", async () => {
    axios.get.mockResolvedValue({ status: 500, statusText: "Error" });

    await expect(
      resolvers.Query.pets(null, { id_usuario: null })
    ).rejects.toThrow("Error al obtener mascotas: Error");
  });

  // -----------------------------------------------------
  // Query: petByID
  // -----------------------------------------------------
  test("petByID() retorna una mascota correctamente", async () => {
    const mockPet = { id: 10, nombre: "Milo" };

    axios.get.mockResolvedValue({ status: 200, data: mockPet });

    const result = await resolvers.Query.petByID(null, { pet_id: 10 });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API_PETS_URL}/mascotas/10`
    );

    expect(result).toEqual(mockPet);
  });

  // -----------------------------------------------------
  // Query: petsForMatch
  // -----------------------------------------------------
  test("petsForMatch() retorna mascotas por especie y usuario", async () => {
    const mockPets = [{ id: 1 }];

    axios.get.mockResolvedValue({ status: 200, data: mockPets });

    const result = await resolvers.Query.petsForMatch(null, {
      id_usuario: 1,
      id_especie: 2
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.API_PETS_URL}/mascotas/especie/2/usuario/1`
    );

    expect(result).toEqual(mockPets);
  });

  // -----------------------------------------------------
  // Mutation: registerPet
  // -----------------------------------------------------
  test("registerPet() registra mascota correctamente", async () => {
    const token = "abc123";
    const input = {
      nombre_mascota: "Kiara",
      id_raza: 1,
      sexo: "H",
      fecha_nacimiento: "2020-01-01"
    };

    axios.get.mockResolvedValue({
      status: 200,
      data: { id_user: 99 }
    });

    axios.post.mockResolvedValue({
      status: 200,
      data: { id: 123, nombre: "Kiara" }
    });

    const result = await resolvers.Mutation.registerPet(null, { input, token });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
    expect(result).toEqual({ id: 123, nombre: "Kiara" });
  });

  test("registerPet() falla si falta un campo obligatorio", async () => {
    const input = { nombre_mascota: "Kiara" }; // faltan muchos campos

    await expect(
      resolvers.Mutation.registerPet(null, { input, token: "xxx" })
    ).rejects.toThrow("Todos los campos son obligatorios");
  });

  test("registerPet() detecta error de autenticación", async () => {
    axios.get.mockRejectedValue({
      response: { data: { detail: "Token inválido" } }
    });

    const input = {
      nombre_mascota: "Kiara",
      id_raza: 1,
      sexo: "H",
      fecha_nacimiento: "2020-01-01"
    };

    await expect(
      resolvers.Mutation.registerPet(null, { input, token: "xxx" })
    ).rejects.toThrow("Error de autenticación: Token inválido");
  });

});
