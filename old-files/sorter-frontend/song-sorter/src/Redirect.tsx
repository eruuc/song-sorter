import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sorter from './Sorter/Sorter'
import Homepage from './Homepage/Homepage'

export default function Redirect() {
    return <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/sort" element={<Sorter />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
}