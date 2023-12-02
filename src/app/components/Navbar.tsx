import { getAuthData, logoutAction } from "../../actions/auth";
import Form from "./Form";

export default async function Navbar() {
  const authData = await getAuthData();
  return authData && (
    <nav className="bg-gray-800">
      <div>
        <span className="text-xl font-semibold">
          Olá, {authData.payload.username}
        </span>
        <Form action={logoutAction}>
          <button type="submit" className="text-white ml-2">Sair</button>
        </Form>
      </div>
    </nav>
  );
}
