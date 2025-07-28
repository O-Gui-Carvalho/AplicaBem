import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="max-w-[1500px] w-full mx-auto flex justify-between">
          <Link to='/'>
            <p className='text-2xl font-bold text-white'>Aplica<span className='text-[#39E5E5]'>Bem</span></p>
          </Link>
          <Link to="/upload" className='primary-button w-fit'>
              Enviar Currículo
          </Link>
        </div>
    </nav>
  )
}

export default Navbar