import React from 'react';
import Helmet from 'react-helmet';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GoogleMapReact from 'google-map-react';

import ALink from '~/components/features/custom-link';
import { fadeIn } from '~/utils/data/keyframes';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function ContactUs() {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    return (
        <main className="main contact-us">
            <Helmet>
                <title>Printing Galore | Contact Us</title>
            </Helmet>

            <h1 className="d-none">Printing Galore - Contact Us</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </nav>

            <div className="page-header" style={{ backgroundImage: 'url(./images/page-header/contact-us-1.png)', backgroundColor: "#92918f" }}>
                <h1 className="page-title font-weight-bold text-capitalize ls-l">Contact Us</h1>
            </div>

            <div className="page-content mt-10 pt-7">
                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <section className="contact-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-6 ls-m mb-4">
                                    <div className="grey-section d-flex align-items-center h-100">
                                        <div>
                                            <h4 className="mb-2 text-capitalize">Headquarters</h4>
                                            <p>27715 Jefferson Ave, Unit 102<br />Temecula, CA 92590</p>
                                            <h4 className="mb-2 text-capitalize">Phone Number</h4>
                                            <p>
                                                <ALink href="#">951 296-5522</ALink>
                                            </p>

                                            <h4 className="mb-2 text-capitalize">Support</h4>
                                            <p className="mb-4">
                                                <ALink href="#">sales@printgalore4u.com</ALink><br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-6 d-flex align-items-center mb-4">
                                    <div className="w-100">
                                        <form className="pl-lg-2" action="#">
                                            <h4 className="ls-m font-weight-bold">Have a question?</h4>
                                            <p>Send us a message. Your email address will not be published. Required fields are marked *</p>
                                            <div className="row mb-2">
                                                <div className="col-12 mb-4">
                                                    <textarea className="form-control" required
                                                        placeholder="Message*"></textarea>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input className="form-control" type="text" placeholder="Name *" required />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <input className="form-control" type="email" placeholder="Email *" required />
                                                </div>
                                            </div>
                                            <button className="btn btn-dark btn-rounded">Send Message<i className="d-icon-arrow-right"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Reveal>


                <Reveal keyframes={fadeIn} delay="50" duration="1000" triggerOnce>
                    <div className="grey-sectdion google-map" id="googlemaps" style={{ height: "386px" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyBgVsModMpsR59_OIK-2sEcmhBBkW4xUuw' }}
                            defaultCenter={{ lat: 33.513161131974336, lng: -117.16019539476477 }}
                            defaultZoom={11}
                        >
                            <AnyReactComponent
                                lat={33.513161131974336}
                                lng={-117.16019539476477}
                                text="My Marker"
                            />
                        </GoogleMapReact>
                    </div>
                </Reveal>
            </div>
        </main>
    )

}

export default React.memo(ContactUs);