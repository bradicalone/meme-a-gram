import React, { useEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { updateTitle, updateUrl, updateFunnelType } from '../../actions/memeActions.js';

function InputFields(props) {


    return (
        <>
            
        </>
    );
}
const mapStateToProps = state => {
    return {
        inputs: state.inputs
    };
};

export default connect(mapStateToProps)(InputFields)
