import { Routes, Route } from 'react-router-dom';

import Home from '../pages/principal/home';
import Login from '../pages/login/login';
import Cadastro from '../pages/cadastro/cadastro';
import { Shows } from '../pages/shows/shows';
import Pagamento from '../pages/pagamento/pagamento';
import Auth from '../pages/autentificacao/auth';

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cadastro" element={<Cadastro/>}/>
            <Route path="/shows" element={<Shows/>}/>
            <Route path="/shows_card" element={<Shows/>}/> 
            <Route path="/pagamento" element={<Pagamento/>}/>
            <Route path="/auth" element={<Auth/>}/>
        </Routes>
    );
}
