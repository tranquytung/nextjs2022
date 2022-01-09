import { DataContent } from "../store/global_state";
import {useContext} from 'react';

export default function Home() {
  const {state} = useContext(DataContent);
  const {auth} = state;


  return (
    <div style={{textAlign: 'center', marginTop: '10%', fontSize: '30px'}}>
        Hello 
        {
            Object.keys(auth).length === 0 ? ('...') : (
                <b>&nbsp;{auth.user.name}</b>
            )
        }
    </div>
  )
}
