import React from 'react'
import './sidebar.css';  
import {LineStyle ,Timeline,TrendingUp} from "@material-ui/icons";
import {useNavigate , Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {Stack} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
export default function Sidebar() {
    const navigate = useNavigate()

    const product = () => {
        navigate('/productpage')
      }
      const menu = () => {
        navigate('/menutable')
      }
      const reviews = () => {
        navigate('/reviews')
      }
    return (
        <div className='sidebar'>
           < div className='sidebarWrapper'>
               <div className='sidebarmenu'>
                   <h3 className='sidebartitle' >Dashboard</h3>
                   <div className='sidebarList'>
                   <Stack spacing={1} sx={{pt: 2}} direction={'row'} justifyContent={"center"} alignItems={"center"}>
               
               <ProductionQuantityLimitsIcon />

               <Button color="inherit"  onClick={product}>Products</Button> 
       
             </Stack>

             <Stack spacing={1} sx={{pt: 2}}  direction={'row'} justifyContent={"center"} alignItems={"center"}>
               
               <MenuBookIcon />

               <Button color="inherit"  onClick={menu}>MENU </Button> 
       
             </Stack>
             <Stack spacing={1} sx={{pt: 2}}  direction={'row'} justifyContent={"center"} alignItems={"center"}>
               
               <CommentIcon />

               <Button color="inherit"  onClick={reviews}>Reviews </Button> 
       
             </Stack>
                
                        
                     </div> 
                 
               </div>
           </div>
          
        </div>
    )
}
