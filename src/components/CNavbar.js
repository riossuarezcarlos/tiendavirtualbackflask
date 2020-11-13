import React, {useState, useContext, useEffect, Fragment} from 'react'; 
import Card from 'react-bootstrap/Card'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';

import {NavSideContext} from '../context/navSideContext';
import {CarritoContext} from '../context/carritoContext';
import {AuthContext} from '../context/authContext';
import {Link} from "react-router-dom"; 
import './css/CNavbar.css'; 
  
import { withStyles } from '@material-ui/core/styles'; 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';    

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx'; 


import CNavSide from './CNavSide';

import { salir } from "../services/authService";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));
  
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: 'rgb(2, 117, 216)',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function CNavbar(){

 const classes = useStyles();
 const history = useHistory();

 const [anchorCar, setAnchorCar] = useState(null);
 const [anchorUsr, setAnchorUsr] = useState(null);
 const [anchorConf, setAnchorConf] = useState(null);
 
 const [cantProductos, setCantidadProductos] = useState("")
 const [nroProductos, setNroProductos] = useState(0)
 const { carrito, busqueda, setBusqueda } = useContext(CarritoContext); 
 const { user, setAuthUser } = useContext(AuthContext);

 const { Navstate, classesCat, toggleDrawer } = useContext(NavSideContext); 
 
 const ConfigurarCantidadProdCarrito = () =>{
     if (carrito.length == 0) {
        setCantidadProductos("");     
     }else{
        setCantidadProductos(carrito.length);
     } 
     setNroProductos(carrito.length);
 }

 useEffect(() => {
    ConfigurarCantidadProdCarrito();  
 },[carrito])

 const handleClickCar = (event) => {
   event.preventDefault(); 
   setAnchorCar(event.currentTarget) 
 };

 const handleCloseCar = () => {
   setAnchorCar(null);
 };

 const handleClickUsr = (event) => {
    event.preventDefault();
    setAnchorUsr(event.currentTarget);
 };

 const handleCloseUsr = () => {
    setAnchorUsr(null);
 };

 const handleClickConf = (event) => {
  event.preventDefault();
  setAnchorConf(event.currentTarget);
};

const handleCloseConf = () => {
  setAnchorConf(null);
};

 const open = Boolean(anchorCar);
 const id = open ? 'simple-popover' : undefined;
   
  // CategoryMenu 
   
    const list = (anchor) => (
    <div
        className={clsx(classesCat.list, {
        [classesCat.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <CNavSide/>
    </div>
    );

  // Fin CategoryMenu


  const logout = () => {
    Swal.fire({
      icon: "warning",
      title: "Desea salir?",
      showConfirmButton: true,
      confirmButtonText: "Si, Salir",
      showCancelButton: true,
    }).then((resultSwal) => {
      if (resultSwal.isDismissed === true) {
        //si es que doy click a cancelar no haga nada
        return;
      }
      salir().then(() => {
        setAuthUser(null);
        Swal.fire({
          icon: "success",
          title: "Se deslogueo exitosamente",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          history.push("/");
        });
      });
    });
    //---------------------
  };

  const setearBusqueda = (value) => {
    setBusqueda(value);
  }

 
 return(
     <div>
        <Navbar bg="light" variant="light" expand="lg" fixed="top"> 
  
          <Fragment key={'left'}>
            <Link to="" onClick={toggleDrawer('left', true)} className="mr-2">
                      <i className="fas fa-bars fa-2x"></i> 
            </Link>   
            <SwipeableDrawer
              anchor={'left'}
              open={Navstate['left']}
              onClose={toggleDrawer('left', false)}
              onOpen={toggleDrawer('left', true)}
            >
              {list('left')}
            </SwipeableDrawer>
          </Fragment>

          <Navbar.Brand href="/home">
              <img src="https://riossuarezcarlos.github.io/proyectogrupo4/src/img/logo.png" alt="..."  className="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
              <Nav className="mr-auto">     
                  <Link  to="/home" className="pl-2 pt-2">
                    ..Seguir Comprando..
                  </Link>    
              </Nav>
              <Form inline className="search ml-auto">
                      <FormControl type="text" placeholder="¿Qué estás buscando?" className="input" onChange={(e) => {setearBusqueda(e.target.value)}}/>
                      
              </Form>
              <Nav className="ml-auto">     
                  <Link  to="" onClick={(e) => handleClickUsr(e)}>
                      <i className="fas fa-user fa-2x pl-2"></i> 
                  </Link>   
                  <Link to="" onClick={(e) => handleClickCar(e)}>
                      <i className="fas fa-shopping-cart fa-2x  pl-2"><span>{cantProductos}</span></i>
                  </Link>   

                  {/* {
                      user !== null ? 
                      (
                        <Link to="" onClick={(e) => handleClickConf(e)}>
                          <i className="fas fa-cog fa-2x  pl-2"></i>
                        </Link>   
                      )
                      : 
                      (
                        <p></p>
                      )
                  }    */}


                  <Link to="" onClick={(e) => handleClickConf(e)}>
                    <i className="fas fa-cog fa-2x  pl-2"></i>
                  </Link>   

              </Nav>
          </Navbar.Collapse> 
        </Navbar> 
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorCar}
                    onClose={handleCloseCar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>   

                          <Box color="info.main">Tiene {nroProductos} productos agregados</Box>          
                          {
                              carrito.map((prod,i) => (
                                  <Card style={{ width: '18rem', marginTop: '4px'}} key={i} className="d-flex justify-content-center flex-row">    
                                      <div className="d-flex align-items-center">
                                      <Card.Img variant="center" src={prod.productImg} alt="..." className="imgpopover" />
                                      </div>
                                      <Card.Body className="pt-1 pb-1 pl-2 pr-2 "> 
                                          <h5 className="marca">{prod.productMark}</h5> 
                                          <h5 className="texto">{prod.productName}</h5>
                                          <h5 className="texto">Precio: {prod.productPrice}</h5>
                                          <h5 className="texto">Cantidad:{prod.productCant}</h5>                    
                                      </Card.Body>
                                  </Card> 
                              ))
                          }  

                          {
                              nroProductos != 0 ? 
                                  (
                                    <div>
                                      {
                                        user !== null ? 
                                        ( 
                                          <Nav.Link>
                                            <Link className="btn btn-primary btn-block mt-2" to="/car" onClick={handleCloseCar}>Procesar Compra</Link>  
                                          </Nav.Link>  
                                        )
                                        : 
                                        (
                                          <Box color="info.main">Iniciar sesión para procesar la compra</Box>
                                        )
                                    }
                                    </div>
                                )  
                                :
                                (
                                  <p></p>
                                )
                              }  
                    </Typography>
                </Popover>


                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorUsr}
                    keepMounted
                    open={Boolean(anchorUsr)}
                    onClose={handleCloseUsr}
                >
                  <div>
                    {
                      user !== null ? 
                        (
                          <>
                            <Link to="/profile">
                              <StyledMenuItem onClick={handleCloseUsr}>
                                  <ListItemIcon> 
                                      <i className="fas fa-id-badge fa-2x" />
                                  </ListItemIcon>
                                  <ListItemText primary="Mi Perfil" />
                              </StyledMenuItem> 
                            </Link>
                            <Link to="/order">
                              <StyledMenuItem onClick={handleCloseUsr}>
                                  <ListItemIcon> 
                                      <i className="fas fa-truck fa-2x" />
                                  </ListItemIcon>
                                  <ListItemText primary="Mis Pedidos" />
                              </StyledMenuItem> 
                            </Link>
                            <Link to="">
                              <StyledMenuItem onClick={()=>{logout()}}>
                                  <ListItemIcon> 
                                      <i className="fas fa-sign-out-alt fa-2x" />
                                  </ListItemIcon>
                                  <ListItemText primary="Salir" />
                              </StyledMenuItem> 
                            </Link>
                          </>
                        )
                        : 
                        (
                          <>
                            <Link to="/login">
                              <StyledMenuItem onClick={handleCloseUsr}>
                                  <ListItemIcon> 
                                      <i className="fas fa-sign-in-alt fa-2x" />
                                  </ListItemIcon>
                                  <ListItemText primary="Ingresar" />
                              </StyledMenuItem> 
                            </Link>
                            <Link to="/register">
                              <StyledMenuItem onClick={handleCloseUsr}>
                                  <ListItemIcon>
                                      <i className="fas fa-user fa-2x" />
                                  </ListItemIcon>
                                  <ListItemText primary="Crear Usuario" />
                              </StyledMenuItem> 
                            </Link>
                          </>
                        )
                    } 
                  </div>
                </StyledMenu>

                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorConf}
                    keepMounted
                    open={Boolean(anchorConf)}
                    onClose={handleCloseConf}
                >
                    <Link to="/product">
                      <StyledMenuItem onClick={handleCloseConf}>
                          <ListItemIcon>
                              <i className="fas fa-barcode fa-2x" />
                          </ListItemIcon>
                          <ListItemText primary="Producto" />
                      </StyledMenuItem> 
                    </Link> 

                    <Link to="/tipo">
                      <StyledMenuItem onClick={handleCloseConf}>
                          <ListItemIcon>
                        
                              <i className="fas fa-clipboard fa-2x"></i>
                             
                          </ListItemIcon>
                          <ListItemText primary="Tipo" />
                      </StyledMenuItem> 
                    </Link> 

                    <Link to="/subcategory">
                      <StyledMenuItem onClick={handleCloseConf}>
                          <ListItemIcon>
                          <i className="fas fa-cubes fa-2x"></i>
                              {/* <i className="fas fa-barcode fa-2x" /> */}
                          </ListItemIcon>
                          <ListItemText primary="SubCategoria" />
                      </StyledMenuItem> 
                    </Link>

                    <Link to="/category">
                      <StyledMenuItem onClick={handleCloseConf}>
                          <ListItemIcon>
                          <i className="fas fa-boxes fa-2x"></i>
                          </ListItemIcon>
                          <ListItemText primary="Categoria" />
                      </StyledMenuItem> 
                    </Link> 

                    <Link to="/label">
                      <StyledMenuItem onClick={handleCloseConf}>
                          <ListItemIcon> 
                              <i className="fas fa-tags fa-2x"></i>
                             
                          </ListItemIcon>
                          <ListItemText primary="Etiqueta" />
                      </StyledMenuItem> 
                    </Link> 
                    
                </StyledMenu>

     </div>
 )   
}