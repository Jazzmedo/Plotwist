import Separator from '/src/components/Home/Separator'
import './player.css'
import {DetailsContext} from '/src/components/context/DetailsContextProvider.jsx'
import { useContext,useEffect, useState } from 'react'

export default function Player() {
      let { id,type } = useContext(DetailsContext)
  return (
    <div className='playercontainer'>
      <Separator/>
      <iframe className='player' src={type==='movie'?`https://vidfast.pro/${type}/${id}`:`https://vidfast.pro/${type}/${id}`} frameBorder="0" allow="encrypted-media fullscreen" allowFullScreen></iframe>
    </div>
  )
}
