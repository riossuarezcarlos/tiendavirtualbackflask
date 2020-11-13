import React, { useState, useContext } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'; 
import Button from '@material-ui/core/Button'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles,ColorlibConnector,ColorlibStepIcon } from './styles/Confirmation'

import CUserData from '../components/delivery/CUserData';
import CDeliveryData from '../components/delivery/CDeliveryData';
import CPayData from '../components/delivery/CPayData';
import CFinish from '../components/delivery/CFinish';

import { AuthContext } from '../context/authContext';
  
function getSteps() {
return ['Identificación', 'Entrega', 'Pago', 'Finalizar'];
}

function getStepContent(step, userId, handleNext) {
    switch (step) {
      case 0:
        return <CUserData userId={userId} handleNext={handleNext}/>;
      case 1:
        return <CDeliveryData handleNext={handleNext}/>;
      case 2:
        return <CPayData handleNext={handleNext}/>;
      case 3:
        return <CFinish/>;
      default:
        return <CUserData/>;
    }
  } 

export default function ConfirmationView() {

    //* Botones *//
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    //* Fin Botones *//

    const { user } = useContext(AuthContext); 

    const obtenerUserId = () => {
      let userIdFire = '';
      user !== null ? 
       userIdFire= user.uid
      :  
       userIdFire = 0;

      return userIdFire;
    }
  
    return (
        <div className={classes.root} style={{ marginTop: '5rem', marginBottom: '1rem'}}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length -1 ? (
            <div className="d-flex justify-content-center flex-column">
                <CFinish/> 
                <Button onClick={handleReset} className={classes.button}>
                  Volver al Inicio
                </Button>
            </div>
          ) : (
            <div>
                <CssBaseline />
                <Container maxWidth="sm" className="mr-auto"> 
                    {
                        getStepContent(activeStep, obtenerUserId(), handleNext)
                    } 
                </Container>
                <div className="d-flex justify-content-center">
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Atras
                    </Button> 
                </div>
            </div>
          )}
        </div>
      </div>
    )
}
