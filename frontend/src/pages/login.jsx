import { useState } from "react";
import api from "../api";


export default function Login() {
const [form, setForm] = useState({ email: "", password: "" });


const submit = async () => {
const res = await api.post("/login", form);
alert(res.data.message);
};


return (
<div className="box">
<h2>Login</h2>
<input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
<input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
<button onClick={submit}>Login</button>
</div>
);
}