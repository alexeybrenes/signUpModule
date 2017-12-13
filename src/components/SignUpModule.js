import React from 'react';
import {
    FlatButton,
    Paper,
    RaisedButton,
    Step,
    Stepper,
    StepLabel,
    TextField
} from 'material-ui';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import data from '../data/data';

import SignUpModuleButton from './SignUpModuleButton';
export default class SignUpModule extends React.Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 3
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        {data.treatmentType.map((item) =>(
                            <SignUpModuleButton
                                key={item.title}
                                label={item.title}
                                nested={item.nestedItems}
                                img={item.img}
                                onClick={this.handleNext}
                            />
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div>
                        {data.serviceType.map((item) =>(
                            <SignUpModuleButton
                                key={item.title}
                                label={item.title}
                                img={item.img}
                                onClick={this.handleNext}
                            />
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div>
                        <TextField
                            hintText="WC1A2SE"
                            floatingLabelText="Please enter your postcode"
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <TextField
                            hintText="Jessica Parker"
                            floatingLabelText="Full Name"
                        />
                        <br/>
                        <TextField
                            hintText="jess1986@gmail.com"
                            floatingLabelText="Email Address"
                        />
                        <br/>
                        <TextField
                            hintText="07700 900009"
                            floatingLabelText="Mobile Number"
                        />
                    </div>
                );
            default:
                return 'An error happened';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>Next step: parse received information, send to API and process.</p>
                    <p>
                        <a
                            href="/"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    {stepIndex >= 2 &&
                    <RaisedButton
                        label={stepIndex === 3 ? 'Create Profile' : 'Next'}
                        primary={true}
                        onClick={this.handleNext}
                    />
                    }
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 850, margin: 'auto'}}>
                <Paper zDepth={3}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Select treatment type</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Select Service Type</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Enter your postcode</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Enter your details</StepLabel>
                        </Step>
                    </Stepper>
                    <ExpandTransition loading={loading} open={true}>
                        {this.renderContent()}
                    </ExpandTransition>
                </Paper>
            </div>
        );
    }
}