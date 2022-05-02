import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';
import LoginModal from '~/components/features/modals/mobile-login-modal';
var CommanFunctions = require("../../../components/commanFunc/commanFunctions");


import { mainMenu } from '~/utils/data/menu';

function MobileMenu(props) {
    const [search, setSearch] = useState("");
    const [timer, setTimer] = useState(null);
    const [isloged, setIsUserLoged] = useState(false);
    const [open, setOpen] = useState(false);

    console.log(isloged)

    let index = 0;


    // const returnval = CommanFunctions.checkUserLoged();
    // //console.log("---*"+JSON.stringify(returnval))
    // //console.log(returnval);

    // if (returnval.success === true) {
    //     console.log(returnval)
    //     //     setIsUserLoged(true)

    // } else {
    //     //     setIsUserLoged(false)
    // }


    const router = useRouter();

    useEffect(() => {
        window.addEventListener('resize', hideMobileMenuHandler);
        document.querySelector("body").addEventListener("click", onBodyClick);

        return () => {
            window.removeEventListener('resize', hideMobileMenuHandler);
            document.querySelector("body").removeEventListener("click", onBodyClick);
        }
    }, [])

    useEffect(() => {
        setSearch("");
    }, [router.query.slug])

    const hideMobileMenuHandler = () => {
        if (window.innerWidth > 991) {
            document.querySelector('body').classList.remove('mmenu-active');
        }
    }

    const hideMobileMenu = () => {
        document.querySelector('body').classList.remove('mmenu-active');
    }

    function onSearchChange(e) {
        setSearch(e.target.value);
    }

    function onBodyClick(e) {
        if (e.target.closest('.header-search')) return e.target.closest('.header-search').classList.contains('show-results') || e.target.closest('.header-search').classList.add('show-results');

        document.querySelector('.header-search.show') && document.querySelector('.header-search.show').classList.remove('show');
        document.querySelector('.header-search.show-results') && document.querySelector('.header-search.show-results').classList.remove('show-results');
    }

    function onSubmitSearchForm(e) {
        e.preventDefault();
        router.push({
            pathname: '/shop',
            query: {
                search: search
            }
        });
    }

    const logout = async (e) => {
        // e.preventDefault();
        CommanFunctions.logout();

        router.push({
            pathname: '/',
        });
    };


    return (
        <div className="mobile-menu-wrapper">
            <div className="mobile-menu-overlay" onClick={hideMobileMenu}>
            </div>


            <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}><i className="d-icon-times"></i></ALink>

            <div className="mobile-menu-container scrollable">
                <ul className="mobile-menu mmenu-anim">
                    <li>
                        <ALink href="/">Home</ALink>
                    </li>
                    <li>
                        <ALink href="/shop">Shop</ALink>
                    </li>
                    <li>
                        <ALink href="/pages/contact-us">Contact Us</ALink>
                    </li>




                    {/* <li className="mb-4 border-no"><a href="https://d-themes.com/buynow/riodereact">Buy Riode!</a></li> */}

                    <li><ALink href={'/pages/cart'}>My Cart</ALink></li>
                    {/* {returnval.success ?
                        <React.Fragment>
                            <li className='mt-7'><ALink href={'/pages/account'}>Account</ALink></li>
                            <li>
                                <a className="" onClick={() => logout()}>
                                    Logout
                                </a>
                            </li>

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <li className='mt-7' onClick={hideMobileMenu}><LoginModal /></li>
                        </React.Fragment>

                    } */}
                    <li className='mt-7' onClick={hideMobileMenu}><LoginModal /></li>
                    {/* <li onClick={hideMobileMenu} ><LoginModal /></li> */}
                </ul>
            </div>
        </div >
    )
}

export default React.memo(MobileMenu);