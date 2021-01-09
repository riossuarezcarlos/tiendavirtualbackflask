import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';

import HomeView from './view/HomeView';
import ProductView from './view/ProductView';
import DetailView from './view/DetailView';
import CarritoView from './view/CarritoView';
import CreateProduct from './components/crud/CreateProduct';
import LoginView from './view/LoginView';
import Registerview from './view/RegisterView';
import Profileview from './view/ProfileView';
import SaleView from './view/SaleView';
import ConfirmationView from './view/ConfirmationView';
import SearchView from './view/SearchView';
import OrderView from './view/OrderView';
import OrderDetailView from './view/OrderDetailView';

import CategoryView from './view/CategoryView'; 
import SubcategoryView from './view/SubcategoryView'
import TypeView from './view/TypeView';
import LabelView from './view/LabelView';

import CreateCategory from './components/crud/CreateCategory';
import CreateSubcategory from './components/crud/CreateSubcategory';
import CreateType from './components/crud/CreateType';
import CreateLabel from './components/crud/CreateLabel';
 
export default function Routes() {  
    return (
        <Fragment>
            {/* <Redirect from='/' to='/home' />  */}
            <Route exac path="/home" component={HomeView} />

            <Route exact path="/login" component={LoginView} />
            <Route exact path="/register" component={Registerview} />
            <Route exact path="/profile" component={Profileview} />
            <Route exact path="/sale" component={SaleView} />
            <Route exact path="/confirmation" component={ConfirmationView} />
            <Route exac path="/car" component={CarritoView} /> 
            <Route exac path="/order" component={OrderView} /> 
            <Route exac path="/orderdetail/:id" component={OrderDetailView} /> 
            <Route exac path="/search/:subCategoryId/:subCategoryName" component={SearchView} /> 

            <Route exac path="/product" component={ProductView} />
            <Route exac path="/createproduct/:id?" component={CreateProduct} />
            <Route exac path="/productdetail/:id" component={DetailView} />
            <Route exact path="/category" component={CategoryView} />
            <Route exact path="/createcategory/:id?" component={CreateCategory} />
            <Route exact path="/subcategory" component={SubcategoryView} /> 
            <Route exact path="/createsubcategory/:id?" component={CreateSubcategory} />
            <Route exact path="/tipo" component={TypeView} />
            <Route exact path="/createtype/:id?" component={CreateType} />
            <Route exact path="/label" component={LabelView} />
            <Route exact path="/createlabel/:id?" component={CreateLabel} />

        </Fragment>
    )
}
