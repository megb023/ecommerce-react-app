import React, { useState } from 'react';
import { Form, Button, Segment, Step, Grid, Container } from 'semantic-ui-react';

function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Order submitted:', formData);
    setStep(4);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Form>
            <Form.Input
              width={12}
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Form.Input
              width={12}
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Form.Group>
              <Form.Input
                width={8}
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <Form.Input
                width={4}
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button primary onClick={() => setStep(2)}>Next</Button>
          </Form>
        );
      case 2:
        return (
          <Form>
            <Form.Select
              width={12}
              label="Payment Method"
              name="paymentMethod"
              options={[
                { key: 'cc', text: 'Credit Card', value: 'creditCard' },
                { key: 'pp', text: 'PayPal', value: 'paypal' },
              ]}
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            />
            <Button onClick={() => setStep(1)}>Back</Button>
            <Button primary onClick={() => setStep(3)}>Next</Button>
          </Form>
        );
      case 3:
        return (
          <Segment>
            <h3>Order Review</h3>
            <p>Name: {formData.fullName}</p>
            <p>Address: {formData.address}</p>
            <p>City: {formData.city}</p>
            <p>Zip Code: {formData.zipCode}</p>
            <p>Payment Method: {formData.paymentMethod}</p>
            <Button onClick={() => setStep(2)}>Back</Button>
            <Button primary onClick={handleSubmit}>Place Order</Button>
          </Segment>
        );
      case 4:
        return (
          <Segment>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order, {formData.fullName}.</p>
            <p>Your order has been received and is being processed.</p>
          </Segment>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Container>
      <Grid centered>
        <Grid.Column width={12}>
          <div className="checkout-page">
            <h1>Checkout</h1>
            <Step.Group ordered>
              <Step active={step === 1} completed={step > 1}>
                <Step.Content>
                  <Step.Title>Shipping</Step.Title>
                </Step.Content>
              </Step>
              <Step active={step === 2} completed={step > 2}>
                <Step.Content>
                  <Step.Title>Payment</Step.Title>
                </Step.Content>
              </Step>
              <Step active={step === 3} completed={step > 3}>
                <Step.Content>
                  <Step.Title>Review</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
            <Segment padded>
              {renderStep()}
            </Segment>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Checkout;