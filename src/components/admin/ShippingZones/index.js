import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { fetchShippingZonesStart } from "../../../redux/Shipping/shipping.actions";

import Button from "../../forms/Button";
import FormInput from "../../forms/FormInput";
import Modal from "../../Modal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

import './styles.scss';

const mapState = state => ({
    zones : state.shippingData.zones
});

const ShippingZones = ({}) => {
    const { zones } = useSelector(mapState);
    const [activeZone, setActiveZone] = useState({
        towns: [],
        delivery: {
            door: {
                small: null,
                medium: null,
                large: null
            },
            pickup_station: {
                small: null,
                medium: null,
                large: null
            }
        }
    });
    const [hideModal, setHideModal] = useState(true);
    const [modalParams, setModalParams] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchShippingZonesStart()
        )
    }, []);

    const handleUpdate = item => {

    }

    const showModal = ({title, documentID, field, curValue=null, isArray=false, deleteValue=false}) => { 
        setModalParams({
            title,
            documentID,
            field,
            curValue,
            isArray,
            deleteValue,
        });
        setHideModal(false);
    }
    const toggleModal = () => setHideModal(!hideModal);
        
    
    const configModal = {
        hideModal,
        toggleModal
      };

    return (
      <div className="shippingZones">
        <h2 className="title">Shipping Zones</h2>
        <div className="wrapper">
          <div className="zoneNames">
            <h3 className="subTitle">ZONES</h3>
            <ul>
              {zones.map((zone, idx) => (
                <li key={idx} onClick={() => setActiveZone(zone)} className={activeZone.documentID === zone.documentID ? 'active' : ''}>
                  {zone.documentID.replace("_", " ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="towns">
            <h3 className="subTitle">TOWNS</h3>
            <ul>
              {(activeZone.towns || []).map((town, idx) => (
                <li key={idx} className="town">
                    <span>{town}</span>
                    <span>
                        <FontAwesomeIcon icon={faTrashCan} className="icon" 
                            onClick={() => showModal({
                                title:'REMOVE TOWN', 
                                documentID: activeZone.documentID, 
                                field: 'towns', 
                                curValue: town, 
                                isArray: true, 
                                deleteValue: true
                            }
                            )}
                        />
                    </span>
                </li>
              ))}
              {activeZone.documentID && (
                <li className="add" key={'asds'}>
                  <Button onClick={()=> showModal({
                      title: 'ADD TOWN', 
                      documentID: activeZone.documentID, 
                      field: 'towns', 
                      curValue: null, 
                      isArray: true
                  })}>ADD TOWN</Button>
                </li>
              )}
            </ul>
          </div>
          <div className="cost">
            <h3 className="subTitle">COST</h3>
            {activeZone.documentID && <div className="wrap">
              <div className="delivery">
                <h3 className="subTitle">DOOR DELIVERY</h3>
                <div className="sizes">
                  <div className="size">
                    <h4 className="subTitle">SMALL</h4>
                    <p className="price">
                      {activeZone.delivery.door.small}
                      <FontAwesomeIcon icon={faEdit} className="icon" 
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.door.small',
                            curValue: activeZone.delivery.door.small
                        })}
                      />
                    </p>
                  </div>
                  <div className="size">
                    <h4 className="subTitle">MEDIUM</h4>
                    <p className="price">
                      {activeZone.delivery.door.medium}
                      <FontAwesomeIcon icon={faEdit} className="icon" 
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.door.medium',
                            curValue: activeZone.delivery.door.medium
                        })}
                      />
                    </p>
                  </div>
                  <div className="size">
                    <h4 className="subTitle">LARGE</h4>
                    <p className="price">
                      {activeZone.delivery.door.large}
                      <FontAwesomeIcon icon={faEdit} className="icon" 
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.door.large',
                            curValue: activeZone.delivery.door.large
                        })}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="delivery">
                <h3 className="subTitle">PICK UP STATION</h3>
                <div className="sizes">
                  <div className="size">
                    <h4 className="subTitle">SMALL</h4>
                    <p className="price">
                      {activeZone.delivery.pickup_station.small}
                      <FontAwesomeIcon icon={faEdit} className="icon" 
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.pickup_station.small',
                            curValue: activeZone.delivery.pickup_station.small
                        })}
                      />
                    </p>
                  </div>
                  <div className="size">
                    <h4 className="subTitle">MEDIUM</h4>
                    <p className="price">
                      {activeZone.delivery.pickup_station.medium}
                      <FontAwesomeIcon icon={faEdit} className="icon"
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.pickup_station.medium',
                            curValue: activeZone.delivery.pickup_station.medium
                        })} 
                      />
                    </p>
                  </div>
                  <div className="size">
                    <h4 className="subTitle">LARGE</h4>
                    <p className="price">
                      {activeZone.delivery.pickup_station.large}
                      <FontAwesomeIcon icon={faEdit} className="icon" 
                        onClick={() => showModal({
                            title: `EDIT COST FOR ${activeZone.documentID.replace('_', ' ')}`,
                            documentID: activeZone.documentID, 
                            field: 'delivery.pickup_station.large',
                            curValue: activeZone.delivery.pickup_station.large
                        })}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
        <Modal {...configModal}>
            {
                modalParams.deleteValue ? 
                <DeleteModal {...modalParams} toggleModal={toggleModal} />
                :
                <UpdateModal {...modalParams} toggleModal={toggleModal} />
            }
        </Modal>
      </div>
    );
}

export default ShippingZones;