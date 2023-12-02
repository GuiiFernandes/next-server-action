import Form from "../components/Form";
import Submit from "../components/Submit";
import { getAuthData, loginAction } from "../../actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const authData = await getAuthData();
  if (authData) redirect('/protected');
  return (
    <div className="m-2">
      <Form className="bg-white p-8 rounded shadow w-96" action={loginAction}>
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        <div>
          <label className="block text-sm text-gray-600" htmlFor="username">Usuário</label>
          <input type="email" name="username" id="username" className="w-full p-2 border rounded shadow mt-1 text-black" required/>
        </div>
        <div>
          <label className="block text-sm text-gray-600" htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" className="w-full p-2 border rounded shadow mt-1 text-black" required/>
        </div>
        <div>
          <Submit type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Entrar</Submit>
        </div>
      </Form>
    </div>
  )
}
