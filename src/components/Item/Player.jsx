import Separator from '/src/components/Home/Separator'
import './player.css'
import {DetailsContext} from '/src/components/context/DetailsContextProvider.jsx'
import { useContext, useState } from 'react'

export default function Player() {
      let { id,type } = useContext(DetailsContext)
      const [baseUrl, setBaseUrl] = useState('https://vidfast.pro');

  return (
    <div className='playercontainer'>
      <Separator/>
      <div className="player-buttons">
        <button id='player1' onClick={() => setBaseUrl('https://vidfast.pro')}>VidFast</button>
        <button id='player1' onClick={() => setBaseUrl('https://player.videasy.net')}>VidEasy</button>
      </div>
      <iframe className='player' src={`${baseUrl}/${type}/${id}`} frameBorder="0" allow="encrypted-media fullscreen" allowFullScreen></iframe>
    </div>
  )
}
