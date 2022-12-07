import React from 'react';
import "./css/ModalComponent.css";




export default function ModalComponent(props) {
    
        return(
            <>
                {props.showModal === false ? null : 
                    <div className={"modal-div"}>
                        <div className={"modal-content-div"}>
                            <div className={"modal-header-div"}>
                                <p className={"modal-header-text"}>
                                    {props.modalHeader}
                                </p>
                            </div>
                            <div className={"modal-body-div"}>
                                {props.children}
                            </div>
                            <div className={"modal-footer-div"}>
                                <button className={"modal-footer-button"} onClick={props.onClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
}