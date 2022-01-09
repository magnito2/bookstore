import React from "react";

import PrimarySchool from "../../assets/primary-school.jpg";
import SecondarySchool from "../../assets/secondary-school.jpg";

import "./styles.scss";

const Directory = props => {
    return  (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${PrimarySchool})`
                    }}
                >
                    <a>
                        Primary School
                    </a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${SecondarySchool})`
                    }}
                >
                    <a>
                        Secondary School
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;