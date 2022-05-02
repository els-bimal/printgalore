import React, { Component }  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
class CustomerCard extends React.Component {
constructor(props) {
    console.log('====');
    console.log(props);
    super(props);
    this.state = {
        
        customerName: props.customer.customerName,
        no : props.customer.no, 
        id : props.customer.id, 
        phone: props.customer.phone, 
        billingAddress : props.customer.billingAddress,

    };
  }

    componentWillReceiveProps(props){
        this.setState({
            customerName: props.customer.customerName,
            no : props.customer.no, 
            id : props.customer.id, 
            phone: props.customer.phone, 
            billingAddress : props.customer.billingAddress,
        })
    } 


  render() {
    return (
        <>
        {this.state.customerName !== undefined?

            (
                <Container className='elementContainer'>
                    
                    <div >
                        <Row  >
                            <Col  >
                                <div><h3>Customer</h3></div>
                            </Col>
                        </Row>
                        <Row  >
                            <Col  >
                                <div><h4>{this.state.customerName}</h4></div>
                            </Col>
                        </Row>
                        <Row  >
                            <Col  >
                                <div><h4><b>No :</b>{this.state.no}</h4></div>
                            </Col>
                        </Row>
                        <Row  >
                            <Col  >
                                <div><h4><b>Id :</b>{this.state.id}</h4></div>
                            </Col>
                        </Row>
                        <Row  >
                            <Col  >
                                <div><h4><b>Billing Adress :</b>{this.state.billingAddress}</h4></div>
                            </Col>
                        </Row>
                        <Row  >
                            <Col  >
                                <div><h4><b>Phone :</b>{this.state.phone}</h4></div>
                            </Col>
                        </Row>
                                
                    </div>
                </Container>)
            : (null)
            }
        </>
    )
  }

}


export default CustomerCard;




